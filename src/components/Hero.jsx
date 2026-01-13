import { lazy, Suspense } from 'react';
import { useLanguage } from '../hooks/useLanguage';

// Lazy load Three.js component for faster initial load
const ThreeBubbles = lazy(() => import('./ThreeBubbles'));

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="hero">
            {/* 3D Bubbles Animation - lazy loaded */}
            <Suspense fallback={null}>
                <ThreeBubbles />
            </Suspense>

            {/* Background */}
            <div className="hero-bg"></div>

            {/* Content */}
            <div className="hero-content">
                <div className="hero-label">
                    {t('heroLabel')}
                </div>

                <h1 className="hero-title">
                    <span className="line"><span>{t('heroTitle1')}</span></span>
                    <span className="line"><span>{t('heroTitle2')}</span></span>
                    <span className="line"><span>{t('heroTitle3')}</span></span>
                </h1>

                <div className="hero-bottom">
                    <div className="hero-stats">
                        <div className="stat">
                            <div className="stat-number">{t('stat1Number')}</div>
                            <div className="stat-label">{t('stat1Label')}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-number">{t('stat2Number')}</div>
                            <div className="stat-label">{t('stat2Label')}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-number">{t('stat3Number')}</div>
                            <div className="stat-label">{t('stat3Label')}</div>
                        </div>
                    </div>

                    <div className="hero-scroll">
                        <span>{t('heroScroll')}</span>
                        <div className="scroll-line"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
