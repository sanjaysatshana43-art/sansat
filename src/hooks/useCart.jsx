import { createContext, useContext, useState, useCallback } from 'react';
import { productConfig, defaultSelectedOptions } from '../data/productData';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(defaultSelectedOptions);

    // Add item to cart
    const addToCart = useCallback((productId) => {
        const config = productConfig[productId];
        const selected = selectedOptions[productId];

        if (!config || !selected) return;

        // Create unique ID based on product + quantity
        const cartItemId = `${productId}-${selected.qty}`;

        // Build the note based on product type
        let note = '';
        if (productId.includes('pom')) {
            note = `${selected.qty} ${productId.includes('large') ? 'Large' : 'Medium'} Fruits`;
        } else {
            note = `${selected.qty} KG`;
        }

        setCart(currentCart => {
            const existing = currentCart.find(item => item.id === cartItemId);

            if (existing) {
                return currentCart.map(item =>
                    item.id === cartItemId
                        ? { ...item, cartQty: item.cartQty + 1 }
                        : item
                );
            }

            return [...currentCart, {
                id: cartItemId,
                productId,
                name: config.name,
                qty: selected.qty,
                unit: config.unit,
                price: selected.price,
                note,
                cartQty: 1
            }];
        });

        return { name: config.name, qty: selected.qty, unit: config.unit };
    }, [selectedOptions]);

    // Update quantity of item in cart
    const updateQty = useCallback((index, change) => {
        setCart(currentCart => {
            const newCart = [...currentCart];
            newCart[index] = {
                ...newCart[index],
                cartQty: Math.max(1, newCart[index].cartQty + change)
            };
            return newCart;
        });
    }, []);

    // Remove item from cart
    const removeFromCart = useCallback((index) => {
        setCart(currentCart => currentCart.filter((_, i) => i !== index));
    }, []);

    // Clear entire cart
    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    // Calculate total
    const getTotal = useCallback(() => {
        return cart.reduce((sum, item) => sum + item.price * item.cartQty, 0);
    }, [cart]);

    // Update selected option for a product
    const updateSelectedOption = useCallback((productId, qty, price) => {
        setSelectedOptions(current => ({
            ...current,
            [productId]: { qty, price }
        }));
    }, []);

    return (
        <CartContext.Provider value={{
            cart,
            selectedOptions,
            addToCart,
            updateQty,
            removeFromCart,
            clearCart,
            getTotal,
            updateSelectedOption
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
