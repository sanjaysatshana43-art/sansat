import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('ta'); // Default to Tamil

    // Load saved language preference on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('sansat-lang');
        if (savedLang && translations[savedLang]) {
            setLang(savedLang);
        }
    }, []);

    // Save language preference when it changes
    useEffect(() => {
        localStorage.setItem('sansat-lang', lang);
    }, [lang]);

    // Translation function
    const t = (key) => {
        return translations[lang]?.[key] || translations.en?.[key] || key;
    };

    // Toggle between languages
    const toggleLang = () => {
        setLang(l => l === 'en' ? 'ta' : 'en');
    };

    // Set specific language
    const setLanguage = (newLang) => {
        if (translations[newLang]) {
            setLang(newLang);
        }
    };

    return (
        <LanguageContext.Provider value={{ lang, t, toggleLang, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
