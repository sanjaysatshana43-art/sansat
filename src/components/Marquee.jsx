import { useLanguage } from '../hooks/useLanguage';

export default function Marquee() {
    const { t } = useLanguage();

    return (
        <div className="marquee">
            <div className="marquee-content">
                <div className="marquee-item">
                    <span>●</span> {t('marqueeText').split('•').map((item, i) => (
                        <span key={i}><span dangerouslySetInnerHTML={{ __html: item.trim() }} /> {i < 5 && <span>●</span>} </span>
                    ))}
                </div>
                <div className="marquee-item">
                    <span>●</span> {t('marqueeText').split('•').map((item, i) => (
                        <span key={i}><span dangerouslySetInnerHTML={{ __html: item.trim() }} /> {i < 5 && <span>●</span>} </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
