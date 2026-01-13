import { useLanguage } from '../hooks/useLanguage';
import { WHATSAPP_CHANNEL_LINK } from '../data/productData';
import WhatsAppIcon from './WhatsAppIcon';

export default function CTASection() {
    const { t } = useLanguage();

    return (
        <section className="cta-section">
            <div className="cta-bg-text">SanSat</div>
            <div className="cta-content">
                <h2
                    className="cta-title reveal"
                    dangerouslySetInnerHTML={{ __html: t('ctaTitle') }}
                />
                <a
                    href={WHATSAPP_CHANNEL_LINK}
                    className="cta-btn reveal reveal-delay-1"
                >
                    <WhatsAppIcon />
                    <span>{t('ctaBtn')}</span>
                </a>
            </div>
        </section>
    );
}
