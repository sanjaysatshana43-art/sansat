import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toast, setToast] = useState({ show: false, message: '', icon: '✅' });

    const showToast = useCallback((message, icon = '✅') => {
        setToast({ show: true, message, icon });
    }, []);

    const hideToast = useCallback(() => {
        setToast(t => ({ ...t, show: false }));
    }, []);

    return (
        <ToastContext.Provider value={{ toast, showToast, hideToast }}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
