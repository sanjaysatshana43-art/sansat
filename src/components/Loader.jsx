import { useEffect, useState } from 'react';
import { useApp } from '../hooks/useApp';
import confetti from 'canvas-confetti';

export default function Loader() {
    const { loaderVisible, hideLoader, seasonOpen } = useApp();
    const [shouldHide, setShouldHide] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldHide(true);

            // Fire celebration if season is open
            if (seasonOpen) {
                setTimeout(() => fireCelebration(), 500);
            }

            // Remove from DOM after animation
            setTimeout(() => {
                hideLoader();
            }, 1000);
        }, 3000);

        return () => clearTimeout(timer);
    }, [seasonOpen, hideLoader]);

    const fireCelebration = () => {
        const count = 200;
        const defaults = { origin: { y: 0.7 }, zIndex: 9999 };

        const fire = (particleRatio, opts) => {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        };

        const colors = ['#C41E3A', '#FFD700', '#228B22', '#FFFFFF'];

        fire(0.25, { spread: 26, startVelocity: 55, colors });
        fire(0.2, { spread: 60, colors });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors });
        fire(0.1, { spread: 120, startVelocity: 45, colors });
    };

    if (!loaderVisible) return null;

    return (
        <div className={`loader ${shouldHide ? 'hide' : ''}`}>
            <div className="loader-text">
                <span className="word">
                    <span style={{ animationDelay: '0s' }}>S</span>
                    <span style={{ animationDelay: '0.05s' }}>a</span>
                    <span style={{ animationDelay: '0.1s' }}>n</span>
                </span>

                <div className="heart-wrapper">
                    <div className="heart-3d"></div>
                </div>

                <span className="word">
                    <span style={{ animationDelay: '0.2s' }}>S</span>
                    <span style={{ animationDelay: '0.25s' }}>a</span>
                    <span style={{ animationDelay: '0.3s' }}>t</span>
                </span>
            </div>
        </div>
    );
}
