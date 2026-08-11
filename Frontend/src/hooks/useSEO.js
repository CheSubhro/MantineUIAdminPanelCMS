
import { useState, useEffect, useCallback } from 'react';
import { showToast } from '../utils/toast';
import api from '../services/api';

export function useSEO() {
    const [seoData, setSeoData] = useState({
        metaTitle: '',
        metaDescription: '',
        focusKeyword: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        robotsTxt: 'User-agent: *\nAllow: /',
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch SEO settings from backend API
    const fetchSeoSettings = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/seo');
            const data = response.data.data || response.data;
            if (data) {
                setSeoData((prev) => ({
                    ...prev,
                    ...data,
                }));
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch SEO settings.';
            showToast.error('Fetch Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSeoSettings();
    }, [fetchSeoSettings]);

    const updateSeoField = useCallback((field, value) => {
        setSeoData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);

    const calculateSeoScore = () => {
        let score = 0;
        const titleLength = seoData.metaTitle?.length || 0;
        const descLength = seoData.metaDescription?.length || 0;
        const focusKw = seoData.focusKeyword || '';

        if (titleLength >= 30 && titleLength <= 60) score += 30;
        if (descLength >= 70 && descLength <= 160) score += 40;
        if (focusKw && seoData.metaTitle?.toLowerCase().includes(focusKw.toLowerCase())) score += 30;
        
        return score;
    };

    // Save SEO settings to backend API via PUT
    const saveSeoSettings = useCallback(async (onSuccess) => {
        setLoading(true);
        setSuccessMessage('');

        try {
            const response = await api.put('/seo', seoData);
            const updatedData = response.data.data || response.data;
            
            if (updatedData) {
                setSeoData((prev) => ({
                    ...prev,
                    ...updatedData,
                }));
            }

            setSuccessMessage('SEO configurations updated successfully!');
            showToast.success('SEO Saved', 'Metadata and search settings updated successfully.');
            
            if (onSuccess) onSuccess();

            setTimeout(() => setSuccessMessage(''), 3000);
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to update SEO settings.';
            showToast.error('Update Failed', errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    }, [seoData]);

    return {
        seoData,
        updateSeoField,
        saveSeoSettings,
        seoScore: calculateSeoScore(),
        loading,
        successMessage,
        refetchSeo: fetchSeoSettings,
    };
}