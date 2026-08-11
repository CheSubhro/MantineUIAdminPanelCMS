
import { useState, useCallback } from 'react';
import { showToast } from '../utils/toast';

export function useSEO(initialData = {}) {
    
    const [seoData, setSeoData] = useState({
        metaTitle: initialData.metaTitle || '',
        metaDescription: initialData.metaDescription || '',
        focusKeyword: initialData.focusKeyword || '',
        ogTitle: initialData.ogTitle || '',
        ogDescription: initialData.ogDescription || '',
        ogImage: initialData.ogImage || '',
        robotsTxt: initialData.robotsTxt || 'User-agent: *\nAllow: /',
        ...initialData,
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const updateSeoField = useCallback((field, value) => {
        setSeoData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);

    const calculateSeoScore = () => {
        let score = 0;
        if (seoData.metaTitle.length >= 30 && seoData.metaTitle.length <= 60) score += 30;
        if (seoData.metaDescription.length >= 70 && seoData.metaDescription.length <= 160) score += 40;
        if (seoData.focusKeyword && seoData.metaTitle.toLowerCase().includes(seoData.focusKeyword.toLowerCase())) score += 30;
        return score;
    };

    const saveSeoSettings = useCallback((onSuccess) => {
        setLoading(true);
        setSuccessMessage('');

        setTimeout(() => {
            setLoading(false);
            setSuccessMessage('SEO configurations updated successfully!');
            showToast.success('SEO Saved', 'Metadata and search settings updated successfully.');
            if (onSuccess) onSuccess();

            setTimeout(() => setSuccessMessage(''), 3000);
        }, 500);
    }, []);

    return {
        seoData,
        updateSeoField,
        saveSeoSettings,
        seoScore: calculateSeoScore(),
        loading,
        successMessage,
    };
}