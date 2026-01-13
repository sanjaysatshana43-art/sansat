import { useState, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useCart } from '../hooks/useCart';
import { useApp } from '../hooks/useApp';
import { useToast } from '../hooks/useToast';
import { productConfig, productOrder, WHATSAPP_CHANNEL_LINK } from '../data/productData';
import WhatsAppIcon from './WhatsAppIcon';

export default function ProductCard({ productId }) {
    const { t } = useLanguage();
    const { selectedOptions, updateSelectedOption, addToCart } = useCart();
    const { seasonOpen, isProductAvailable } = useApp();
    const { showToast } = useToast();
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const product = productConfig[productId];
    if (!product) return null;

    const selected = selectedOptions[productId];
    const isAvailable = isProductAvailable(productId);

    const handleVariantClick = (option) => {
        updateSelectedOption(productId, option.qty, option.price);
    };

    const handleButtonClick = () => {
        if (!isAvailable) return;

        if (seasonOpen) {
            const result = addToCart(productId);
            if (result) {
                showToast(`${result.name} (${result.qty} ${result.unit}) ${t('addedToCart')}`, '🛒');
            }
        } else {
            window.location.href = WHATSAPP_CHANNEL_LINK;
        }
    };

    const toggleTooltip = (e) => {
        e.stopPropagation();
        setTooltipOpen(!tooltipOpen);
    };

    const closeTooltip = (e) => {
        e.stopPropagation();
        setTooltipOpen(false);
    };

    return (
        <div className={`product-card-large reveal ${!isAvailable ? 'out-of-stock' : ''}`}>
            <div className="product-image">
                <img src={product.image} alt={product.name} loading="lazy" decoding="async" onLoad={(e) => e.target.classList.add('loaded')} />
                <div className="product-tag">{product.tag}</div>

                <button className="benefits-badge" onClick={toggleTooltip}>
                    {product.benefitsBadge}
                </button>

                <div className={`benefits-tooltip ${tooltipOpen ? 'show' : ''}`}>
                    <button className="benefits-close" onClick={closeTooltip}>×</button>
                    <h4>🍇 {t(product.nameKey)} Benefits</h4>
                    <ul>
                        {product.benefits.map((benefit, i) => (
                            <li key={i}>
                                <span className="icon">{benefit.icon}</span>
                                <span>{benefit.text}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="farm-note">{product.farmNote}</div>
                </div>

                <div className="product-price-tag">Rs. {selected?.price?.toLocaleString()}</div>
            </div>

            <div className="product-info">
                <h3 className="product-name">{t(product.nameKey)}</h3>
                <p className="product-desc">{t(product.descKey)}</p>

                <div className="product-variants">
                    {product.options.map((option, i) => (
                        <button
                            key={i}
                            className={`variant-chip ${selected?.qty === option.qty ? 'active' : ''}`}
                            onClick={() => handleVariantClick(option)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                <button
                    className={`product-btn ${!seasonOpen ? 'whatsapp' : ''}`}
                    onClick={handleButtonClick}
                    disabled={!isAvailable}
                >
                    <WhatsAppIcon />
                    <span className="btn-text">
                        {!isAvailable
                            ? t('btnOutOfStock')
                            : seasonOpen
                                ? t('btnAddToOrder')
                                : t('btnJoinAlert')
                        }
                    </span>
                </button>
            </div>
        </div>
    );
}

export function ProductSection() {
    const { t } = useLanguage();
    const wrapperRef = useRef(null);

    const scroll = (direction) => {
        if (wrapperRef.current) {
            const scrollAmount = 350; // Approximate card width
            wrapperRef.current.scrollBy({
                left: direction === 'next' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="products" className="horizontal-section section">
            <div className="section-label reveal">{t('productsLabel')}</div>
            <h2
                className="section-title reveal reveal-delay-1"
                dangerouslySetInnerHTML={{ __html: t('productsTitle') }}
            />

            {/* Benefits Cards */}
            <div className="benefits-section-modern">
                <BenefitsCard type="jambu" />
                <BenefitsCard type="pomegranate" />
            </div>

            <button className="scroll-btn prev" aria-label="Previous" onClick={() => scroll('prev')}>←</button>
            <button className="scroll-btn next" aria-label="Next" onClick={() => scroll('next')}>→</button>

            <div className="horizontal-wrapper" ref={wrapperRef}>
                {productOrder.map(productId => (
                    <ProductCard key={productId} productId={productId} />
                ))}
            </div>
        </section>
    );
}

function BenefitsCard({ type }) {
    const { t } = useLanguage();

    const isJambu = type === 'jambu';
    const image = isJambu ? './dark_red_thai_wax_apple.webp' : './red_pomegranate.webp';
    const badge = isJambu ? 'Jambu' : 'Pomegranate';
    const titleKey = isJambu ? 'jambuBenefitsTitle' : 'pomBenefitsTitle';
    const subtitleKey = isJambu ? 'jambuBenefitsSubtitle' : 'pomBenefitsSubtitle';
    const benefitKeys = isJambu
        ? ['jambuBenefit1', 'jambuBenefit2', 'jambuBenefit3', 'jambuBenefit4', 'jambuBenefit5', 'jambuBenefit6']
        : ['pomBenefit1', 'pomBenefit2', 'pomBenefit3', 'pomBenefit4', 'pomBenefit5', 'pomBenefit6'];
    const farmBadgeKey = isJambu ? 'jambuFarmBadge' : 'pomFarmBadge';

    return (
        <div className={`benefit-card-modern ${type} reveal`}>
            <div className="benefit-image-placeholder">
                <img src={image} alt={`${type} Benefits`} loading="lazy" decoding="async" onLoad={(e) => e.target.classList.add('loaded')} />
                <div className="benefit-image-overlay">
                    <span className={`benefit-fruit-badge ${type}`}>{badge}</span>
                </div>
            </div>
            <div className="benefit-content">
                <h3
                    className={`benefit-title-modern ${type}`}
                    dangerouslySetInnerHTML={{ __html: t(titleKey) }}
                />
                <p className="benefit-subtitle-modern">{t(subtitleKey)}</p>
                <div className="benefit-grid">
                    {benefitKeys.map((key, i) => (
                        <div key={i} className={`benefit-pill ${isJambu ? 'jambu' : ''}`}>
                            {t(key)}
                        </div>
                    ))}
                </div>
                {isJambu && (
                    <div className="benefit-special-tag">{t('jambuSpecialTag')}</div>
                )}
                <div className={`benefit-farm-badge ${isJambu ? 'jambu' : ''}`}>
                    <span className="farm-icon">🌴</span>
                    <span>{t(farmBadgeKey)}</span>
                </div>
            </div>
        </div>
    );
}
