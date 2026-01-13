import { createContext, useContext, useState } from 'react';
import { stockAvailability } from '../data/productData';

const AppContext = createContext();

export function AppProvider({ children }) {
    // ⚙️ DEVELOPER CONTROLS
    // Season status: true = OPEN (ordering enabled), false = CLOSED (WhatsApp alerts only)
    const [seasonOpen, setSeasonOpen] = useState(true);

    // UI state
    const [menuOpen, setMenuOpen] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState(true);

    // Toggle menu
    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
        document.body.style.overflow = !menuOpen ? 'hidden' : '';
    };

    const closeMenu = () => {
        setMenuOpen(false);
        document.body.style.overflow = '';
    };

    // Hide loader
    const hideLoader = () => {
        setLoaderVisible(false);
    };

    // Check if product is available - uses stockAvailability from productData.js
    const isProductAvailable = (productId) => {
        return stockAvailability[productId] ?? true;
    };

    return (
        <AppContext.Provider value={{
            seasonOpen,
            setSeasonOpen,
            menuOpen,
            toggleMenu,
            closeMenu,
            loaderVisible,
            hideLoader,
            isProductAvailable
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
