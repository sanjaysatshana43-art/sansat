import { useLanguage } from '../hooks/useLanguage';

export default function StorySection() {
    const { t } = useLanguage();

    return (
        <>
            <section id="story" className="split-section">
                <div className="split-image reveal">
                    <img src="./farming_wax_apple.webp" alt="Natural Fruits" loading="lazy" decoding="async" onLoad={(e) => e.target.classList.add('loaded')} />
                </div>
                <div className="split-content">
                    <div className="split-number reveal">01</div>
                    <h2 className="split-title reveal reveal-delay-1">{t('story1Title')}</h2>
                    <p
                        className="split-text reveal reveal-delay-2"
                        dangerouslySetInnerHTML={{ __html: t('story1Text') }}
                    />
                </div>
            </section>

            <section className="split-section">
                <div className="split-content" style={{ background: 'var(--green)' }}>
                    <div className="split-number reveal" style={{ color: 'var(--green-light)' }}>02</div>
                    <h2 className="split-title reveal reveal-delay-1">{t('story2Title')}</h2>
                    <p
                        className="split-text reveal reveal-delay-2"
                        dangerouslySetInnerHTML={{ __html: t('story2Text') }}
                    />
                </div>
                <div className="split-image reveal">
                    <img src="./jambu_promise.webp" alt="Fresh Jambu Harvest" loading="lazy" decoding="async" onLoad={(e) => e.target.classList.add('loaded')} />
                </div>
            </section>
        </>
    );
}


