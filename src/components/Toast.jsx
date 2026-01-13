import { useState, useEffect } from 'react';

export default function Toast({ message, icon = '✅', show, onHide }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onHide();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onHide]);

    return (
        <div className={`toast ${show ? 'visible' : ''}`}>
            <span>{icon}</span>
            <span>{message}</span>
        </div>
    );
}
