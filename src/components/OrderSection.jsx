import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useCart } from '../hooks/useCart';
import { useApp } from '../hooks/useApp';
import { useToast } from '../hooks/useToast';
import { deliveryAreas, WHATSAPP_NUMBER } from '../data/productData';
import WhatsAppIcon from './WhatsAppIcon';

export default function OrderSection() {
    const { t } = useLanguage();
    const { cart, updateQty, clearCart, getTotal } = useCart();
    const { seasonOpen } = useApp();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        mobile1: '',
        mobile2: '',
        area: '',
        address: '',
        landmark: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleClearCart = () => {
        if (cart.length === 0) return;
        if (window.confirm(t('clearCartConfirm'))) {
            clearCart();
            showToast(t('cartCleared') || 'Cart cleared!', '🗑️');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Show toast if cart is empty
        if (cart.length === 0) {
            showToast(t('cartEmptyError') || 'Your cart is empty! Please add some items.', '⚠️');
            return;
        }

        const name = formData.name || "(Please type your name here)";
        const mobile1 = formData.mobile1 || "(Please type your mobile number)";
        const mobile2 = formData.mobile2 || "(Optional)";
        const area = formData.area || "(Select area)";
        const address = formData.address || "(Please type your address here)";
        const landmark = formData.landmark || "(Please type your landmark)";

        const total = getTotal();
        const orderItems = cart.map(item =>
            `• ${item.name} (${item.note}) x${item.cartQty} = Rs.${(item.price * item.cartQty).toLocaleString()}`
        ).join('\n');

        const orderSection = `*Order:*\n${orderItems}`;
        const totalSection = `💰 *TOTAL: Rs. ${total.toLocaleString()}*`;

        const message = `🛒 *NEW ORDER - SanSat Fruit Co.*

*Customer:*
Name: ${name}
Mobile 1: ${mobile1}
Mobile 2: ${mobile2}
Area: ${area}
Address: ${address}
Landmark: ${landmark}

${orderSection}

${totalSection}

Payment: Cash on Delivery`;

        window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    };

    // Always show order section (removed seasonOpen check)

    return (
        <section id="order" className={`order-section section ${seasonOpen ? 'visible' : ''}`}>
            <div className="order-grid">
                {/* Cart Summary */}
                <div className="order-summary reveal">
                    <h2 className="order-title">{t('orderTitle')}</h2>

                    <div id="cartItems">
                        {cart.length === 0 ? (
                            <p style={{ opacity: 0.7, textAlign: 'center', padding: '2rem' }}>
                                {t('orderEmpty')}
                            </p>
                        ) : (
                            <>
                                {cart.map((item, i) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-info">
                                            <h4>{item.name}</h4>
                                            <p>{item.note} × {item.cartQty}</p>
                                        </div>
                                        <div className="cart-item-controls">
                                            <button className="qty-btn" onClick={() => updateQty(i, -1)}>−</button>
                                            <span style={{ fontWeight: 600, minWidth: 24, textAlign: 'center' }}>{item.cartQty}</span>
                                            <button className="qty-btn" onClick={() => updateQty(i, 1)}>+</button>
                                            <span style={{ fontWeight: 700, minWidth: 100, textAlign: 'right' }}>
                                                Rs. {(item.price * item.cartQty).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                <div style={{ textAlign: 'right', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed rgba(255,255,255,0.2)' }}>
                                    <button
                                        onClick={handleClearCart}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'white',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            textDecoration: 'underline',
                                            opacity: 0.8
                                        }}
                                    >
                                        🗑️ {t('clearCart')}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="cart-total">
                        <span>{t('orderTotal')}</span>
                        <span>Rs. {getTotal().toLocaleString()}</span>
                    </div>
                </div>

                {/* Order Form */}
                <form className="order-form reveal reveal-delay-1" onSubmit={handleSubmit}>
                    <h2 className="form-title">{t('formTitle')}</h2>
                    <p className="form-note">{t('formNote')}</p>

                    <div className="form-group">
                        <label className="form-label">{t('formName')}</label>
                        <input
                            type="text"
                            className="form-input"
                            name="name"
                            placeholder={t('formNamePlaceholder')}
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">{t('formMobile1')}</label>
                            <input
                                type="tel"
                                className="form-input"
                                name="mobile1"
                                placeholder="07X XXX XXXX"
                                value={formData.mobile1}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">{t('formMobile2')}</label>
                            <input
                                type="tel"
                                className="form-input"
                                name="mobile2"
                                placeholder="07X XXX XXXX"
                                value={formData.mobile2}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">{t('formArea')}</label>
                        <select
                            className="form-input"
                            name="area"
                            value={formData.area}
                            onChange={handleInputChange}
                        >
                            <option value="">{t('formAreaSelect')}</option>
                            {deliveryAreas.map(area => (
                                <option key={area} value={area}>{area}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">{t('formAddress')}</label>
                        <textarea
                            className="form-input"
                            name="address"
                            rows="3"
                            placeholder={t('formAddressPlaceholder')}
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            {t('formLandmark')} <span style={{ color: 'var(--ruby)' }}>{t('formLandmarkMandatory')}</span>
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            name="landmark"
                            placeholder={t('formLandmarkPlaceholder')}
                            value={formData.landmark}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="cod-note" dangerouslySetInnerHTML={{ __html: t('formCodNote') }} />

                    <button type="submit" className="submit-btn">
                        {t('formSubmit')}
                        <WhatsAppIcon />
                    </button>
                </form>
            </div>
        </section>
    );
}
