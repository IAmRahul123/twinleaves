import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        setCart(prevCart => {
            const existingProductIndex = prevCart.findIndex(item => item.product.sku_code === product.sku_code);
            if (existingProductIndex > -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += quantity;
                return updatedCart;
            } else {
                return [...prevCart, { product, quantity }];
            }
        });
    };

    const minQuantity = (sku_code) => {
        setCart(prevCart => {
            let updatedCart = prevCart.map(item => 
                item.product.sku_code === sku_code ? { ...item, quantity:item?.quantity-1 } : item
            );
            updatedCart=updatedCart.filter(item => item.quantity>0)
            return updatedCart;
        });
    };
    const addQuantity = (sku_code) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item => 
                item.product.sku_code === sku_code ? { ...item, quantity:item?.quantity+1 } : item,
            );
            return updatedCart;
        });
    };

    const removeFromCart = (sku_code) => {
        setCart(prevCart => prevCart.filter(item => item.product.sku_code !== sku_code));
    };
    const checkProductExist = (sku_code) => {
        if(cart.find(item => item?.product?.sku_code === sku_code)){
            return true
        }else{
            return false
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, minQuantity, removeFromCart,checkProductExist,addQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
