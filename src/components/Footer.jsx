import { useLanguage } from '../hooks/useLanguage';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="footer">
            <div className="footer-grid">
                <div>
                    <div className="footer-logo">SanSat Fruit Co.</div>
                    <p
                        className="footer-desc"
                        dangerouslySetInnerHTML={{ __html: t('footerDesc') }}
                    />
                </div>
                <div>
                    <div className="footer-title">{t('footerNavTitle')}</div>
                    <div className="footer-links">
                        <a href="#products">{t('navProducts')}</a>
                        <a href="#story">{t('navStory')}</a>
                        <a href="#process">{t('navProcess')}</a>
                        <a href="#faq">{t('navFaq')}</a>
                    </div>
                </div>
                <div>
                    <div className="footer-title">{t('footerAreasTitle')}</div>
                    <div className="footer-links">
                        <a href="#">{t('areaBatticaloa')}</a>
                        <a href="#">{t('areaKallady')}</a>
                        <a href="#">{t('areaKattankudy')}</a>
                        <a href="#">{t('areaEravur')}</a>
                    </div>
                </div>
                <div>
                    <div className="footer-title">{t('footerContactTitle')}</div>
                    <div className="footer-links">
                        <a href="tel:+94771420406">+94 77 142 0406</a>
                        <a href="https://wa.me/94771420406">WhatsApp</a>
                        <a href="mailto:sansatco43@gmail.com">sansatco43@gmail.com</a>
                        <a href="#">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>{t('footerCopyright')}</p>
                <p>{t('footerMade')}</p>
            </div>
        </footer>
    );
}
