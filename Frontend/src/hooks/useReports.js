
import { useState, useEffect, useMemo, useCallback } from 'react';
import { showToast } from '../utils/toast';
import api from '../services/api';

export function useReports() {
    
    const [reportType, setReportType] = useState('post-performance');
    const [timeRange, setTimeRange] = useState('30days');
    const [customDateRange, setCustomDateRange] = useState({ from: '', to: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Raw report data fetched from backend API
    const [rawReportData, setRawReportData] = useState([]);

    // Fetch reports from backend API whenever reportType or timeRange changes
    const fetchReports = useCallback(async (type, range) => {
        setLoading(true);
        try {
            const response = await api.get(`/reports`, {
                params: {
                    reportType: type,
                    timeRange: range,
                },
            });

            const result = response.data.data || response.data;
            // backend returns { reportType, timeRange, data: [...] }
            const dataList = result.data || result;
            setRawReportData(Array.isArray(dataList) ? dataList : [dataList]);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch reports.';
            showToast.error('Fetch Failed', errorMessage);
            setRawReportData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Trigger fetch on reportType or timeRange change
    useEffect(() => {
        fetchReports(reportType, timeRange);
    }, [reportType, timeRange, fetchReports]);

    // Handle Report Type Change
    const handleSetReportType = useCallback((type) => {
        setReportType(type);
    }, []);

    // Handle Time Range Change
    const handleSetTimeRange = useCallback((range) => {
        setTimeRange(range);
    }, []);

    // Filter report data based on search query dynamically
    const currentReportData = useMemo(() => {
        if (!Array.isArray(rawReportData)) return [];

        if (!searchQuery.trim()) return rawReportData;

        const query = searchQuery.toLowerCase();

        return rawReportData.filter((item) => {
            return Object.values(item).some((val) => {
                if (typeof val === 'string' || typeof val === 'number') {
                    return String(val).toLowerCase().includes(query);
                }
                // Handle nested objects/arrays like sources in trafficSummary if needed
                if (Array.isArray(val)) {
                    return val.some(subItem => 
                        Object.values(subItem).some(subVal => 
                            String(subVal).toLowerCase().includes(query)
                        )
                    );
                }
                return false;
            });
        });
    }, [rawReportData, searchQuery]);

    const exportAsCSV = useCallback((fileName = 'report.csv') => {
        if (!currentReportData.length) return;
        
        // Flatten or pick headers safely
        const flatData = currentReportData.map(item => {
            if (item && typeof item === 'object' && !Array.isArray(item)) {
                const copy = { ...item };
                // Convert arrays/objects to string for CSV
                Object.keys(copy).forEach(k => {
                    if (typeof copy[k] === 'object') {
                        copy[k] = JSON.stringify(copy[k]);
                    }
                });
                return copy;
            }
            return { value: item };
        });

        const headers = Object.keys(flatData[0]);
        const csvRows = [
            headers.join(','),
            ...flatData.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
        ];
        
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', fileName);
        a.click();
        window.URL.revokeObjectURL(url);
    }, [currentReportData]);

    const exportAsPDF = useCallback(() => {
        window.print();
    }, []);

    return {
        reportType,
        setReportType: handleSetReportType,
        timeRange,
        setTimeRange: handleSetTimeRange,
        customDateRange,
        setCustomDateRange,
        searchQuery,
        setSearchQuery,
        currentReportData,
        loading,
        exportAsCSV,
        exportAsPDF,
        refetchReports: () => fetchReports(reportType, timeRange),
    };
}