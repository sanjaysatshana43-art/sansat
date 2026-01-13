import { useLanguage } from '../hooks/useLanguage';
import { useApp } from '../hooks/useApp';
import { WHATSAPP_CHANNEL_LINK } from '../data/productData';
import WhatsAppIcon from './WhatsAppIcon';

export default function MobileSticky() {
    const { t } = useLanguage();
    const { seasonOpen } = useApp();

    const handleClick = (e) => {
        e.preventDefault();
        if (seasonOpen) {
            document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = WHATSAPP_CHANNEL_LINK;
        }
    };

    return (
        <div className="mobile-sticky">
            <button
                className={`mobile-btn ${!seasonOpen ? 'whatsapp' : ''}`}
                onClick={handleClick}
            >
                <WhatsAppIcon />
                <span>{seasonOpen ? t('navCtaOrder') : t('btnJoinAlert')}</span>
            </button>
        </div>
    );
}
