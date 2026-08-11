
import React, { useState } from 'react';
import { useReports } from '../hooks/useReports';
import { ReportFilters } from '../features/reports/components/ReportFilters';
import { ReportTable } from '../features/reports/components/ReportTable';
import {
    ErrorBoundary,
    Spinner,
    Card,
    ConfirmModal,
} from '../components/common';

export default function ReportsPage() {
    const {
        reportType,
        setReportType,
        timeRange,
        setTimeRange,
        searchQuery,
        setSearchQuery,
        currentReportData,
        loading,
        exportAsCSV,
        exportAsPDF,
    } = useReports();

    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [exportType, setExportType] = useState(null);

    const formatReportType = (value) => {
        if (!value) return 'Report';
        return value
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleTriggerExport = (type) => {
        setExportType(type);
        setIsExportModalOpen(true);
    };

    const handleConfirmExport = () => {
        if (exportType === 'csv') {
            exportAsCSV(`${reportType}-${timeRange}-report.csv`);
        }
        if (exportType === 'pdf') {
            exportAsPDF();
        }
        setIsExportModalOpen(false);
        setExportType(null);
    };

    const handleCloseModal = () => {
        setIsExportModalOpen(false);
        setExportType(null);
    };

    return (
        <ErrorBoundary>
            <main className="w-full max-w-7xl mx-auto p-4 sm:p-6">
                {/* Page Header */}
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Reports
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Generate periodic summaries, track content performance, and export insights.
                    </p>
                </header>

                {/* Filters */}
                <ReportFilters
                    reportType={reportType}
                    setReportType={setReportType}
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onExportCSV={() => handleTriggerExport('csv')}
                    onExportPDF={() => handleTriggerExport('pdf')}
                />

                {/* Report Data Table or Spinner */}
                {loading ? (
                    <Card className="flex min-h-64 items-center justify-center p-12">
                        <Spinner size="lg" />
                    </Card>
                ) : (
                    <ReportTable
                        data={currentReportData}
                        reportType={reportType}
                    />
                )}

                {/* Export Confirmation Modal */}
                <ConfirmModal
                    isOpen={isExportModalOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmExport}
                    title="Confirm Export"
                    message={`Are you sure you want to export the ${formatReportType(
                        reportType
                    )} report as ${exportType?.toUpperCase() ?? ''}?`}
                    confirmText="Proceed Export"
                    cancelText="Cancel"
                />
            </main>
        </ErrorBoundary>
    );
}