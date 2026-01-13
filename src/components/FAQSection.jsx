import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

export default function FAQSection() {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        { qKey: 'faq1Q', aKey: 'faq1A' },
        { qKey: 'faq2Q', aKey: 'faq2A' },
        { qKey: 'faq3Q', aKey: 'faq3A' },
        { qKey: 'faq4Q', aKey: 'faq4A' }
    ];

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="faq-section section">
            <div className="faq-grid">
                <div>
                    <div className="section-label reveal">{t('faqLabel')}</div>
                    <h2
                        className="section-title reveal reveal-delay-1"
                        dangerouslySetInnerHTML={{ __html: t('faqTitle') }}
                    />
                </div>
                <div>
                    {faqs.map((faq, i) => (
                        <div key={i} className={`faq-item reveal reveal-delay-${i}`}>
                            <button className="faq-question" onClick={() => toggleFaq(i)}>
                                <span>{t(faq.qKey)}</span>
                                <span className="faq-icon">{openIndex === i ? '−' : '+'}</span>
                            </button>
                            <div className={`faq-answer ${openIndex === i ? 'open' : ''}`}>
                                <p>{t(faq.aKey)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
