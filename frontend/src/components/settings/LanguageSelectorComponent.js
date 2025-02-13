import React, { useEffect } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check'; 
import { useLanguage } from '../../hooks/LanguageContext';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

function LanguageSelectorComponent() {
    const { language, handleLanguageChange } = useLanguage();
    const { t } = useTranslation();

    const languageOptions = {
        es: 'Español',
        en: 'English',
    };

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            handleLanguageChange(savedLanguage);
            i18n.changeLanguage(savedLanguage);
        }
    }, [handleLanguageChange]);

    const handleChange = (event) => {
        const newLanguage = event.target.value;
        handleLanguageChange(newLanguage);
        i18n.changeLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    return (
        <Box
            sx={{
                mt: 4,
                p: 3,
                bgcolor: 'white',
                borderRadius: 1,
                boxShadow: 3,
                maxWidth: 320,
                mx: 'auto',
                border: '1px solid #e0e0e0',
            }}
        >
            <Typography variant="h6" component="h2" gutterBottom>
                {t('language_selection')}
            </Typography>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="language-select-label">{t('language')}</InputLabel>
                <Select
                    labelId="language-select-label"
                    id="language-select"
                    value={language}
                    onChange={handleChange}
                    label={t('language')}
                >
                    {Object.entries(languageOptions).map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {language === key && <CheckIcon sx={{ color: 'green', fontSize: 'medium' }} />} {/* Check más grande */}
                                <Chip label={value} variant="outlined" size="small" />
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default LanguageSelectorComponent;
