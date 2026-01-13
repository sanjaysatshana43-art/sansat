import { useLanguage } from '../hooks/useLanguage';

export default function ProcessSection() {
    const { t } = useLanguage();

    const processes = [
        { num: '01', titleKey: 'process1Title', descKey: 'process1Desc', image: './process_harvest.webp', colorClass: 'ruby' },
        { num: '02', titleKey: 'process2Title', descKey: 'process2Desc', image: './process_pack.webp', colorClass: 'rose' },
        { num: '03', titleKey: 'process3Title', descKey: 'process3Desc', image: './process_deliver.webp', colorClass: 'green' },
        { num: '04', titleKey: 'process4Title', descKey: 'process4Desc', image: './process_pay.webp', colorClass: 'gold' }
    ];

    return (
        <section id="process" className="color-blocks">
            {processes.map((process, i) => (
                <div key={i} className={`color-block ${process.colorClass} reveal reveal-delay-${i}`}>
                    <img src={process.image} alt={t(process.titleKey)} loading="lazy" decoding="async" onLoad={(e) => e.target.classList.add('loaded')} />
                    <div className="block-number">{process.num}</div>
                    <div className="block-title">{t(process.titleKey)}</div>
                    <div className="block-desc">{t(process.descKey)}</div>
                </div>
            ))}
        </section>
    );
}
