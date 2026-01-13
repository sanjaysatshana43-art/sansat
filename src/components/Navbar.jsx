import { useRef } from 'react';
import { useApp } from '../hooks/useApp';
import { useLanguage } from '../hooks/useLanguage';
import { WHATSAPP_CHANNEL_LINK } from '../data/productData';

export default function Navbar() {
    const { seasonOpen, menuOpen, toggleMenu, closeMenu } = useApp();
    const { lang, t, setLanguage } = useLanguage();
    const navCtaRef = useRef(null);

    const handleMainCta = (e) => {
        e.preventDefault();
        if (seasonOpen) {
            document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = WHATSAPP_CHANNEL_LINK;
        }
        closeMenu();
    };

    const handleNavClick = (sectionId) => {
        closeMenu();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* Season Banner */}
            <div
                className={`season-banner ${seasonOpen ? 'open' : 'closed'}`}
                dangerouslySetInnerHTML={{ __html: seasonOpen ? t('seasonOpen') : t('seasonClosed') }}
            />

            {/* Navigation */}
            <nav className="nav" id="mainNav">
                <div className="nav-left">
                    <button
                        className={`hamburger ${menuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <a href="#" className="nav-logo">SanSat</a>
                </div>

                <div className="nav-right-stack">
                    <button
                        ref={navCtaRef}
                        className="nav-cta"
                        onClick={handleMainCta}
                    >
                        {seasonOpen ? t('navCtaOrder') : t('navCtaAlert')}
                    </button>
                    <div className="nav-glass-logo">
                        <img src="./SanSatLogo.webp" alt="SanSat Logo" />
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                <a href="#products" onClick={() => handleNavClick('products')}>{t('navProducts')}</a>
                <a href="#story" onClick={() => handleNavClick('story')}>{t('navStory')}</a>
                <a href="#process" onClick={() => handleNavClick('process')}>{t('navProcess')}</a>
                <a href="#faq" onClick={() => handleNavClick('faq')}>{t('navFaq')}</a>

                {/* Language Toggle */}
                <div className="lang-label">🌐 Language / மொழி</div>
                <div className="lang-segmented-control">
                    <div
                        className={`lang-option ${lang === 'en' ? 'active' : ''}`}
                        onClick={() => setLanguage('en')}
                    >
                        English
                    </div>
                    <div
                        className={`lang-option ${lang === 'ta' ? 'active' : ''}`}
                        onClick={() => setLanguage('ta')}
                    >
                        தமிழ்
                    </div>
                    <div
                        className="lang-glider"
                        style={{ transform: lang === 'ta' ? 'translateX(100%)' : 'translateX(0)' }}
                    />
                </div>
            </div>
        </>
    );
}
