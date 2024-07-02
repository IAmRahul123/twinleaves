import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const URL = "https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/filter/product"


    const getProducts = async () => {
        try {
            setLoading(true)
            const res = await axios.post(URL, {
                "page": "1",
                "pageSize": "10",
                "sort": {
                    "creationDateSortOption": "DESC"
                }
            })
            setProducts(res?.data?.products)
        } catch (error) {
            console.log("ERROR", error)
        } finally {
            setLoading(false)
        }
    }

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
                item.product.sku_code === sku_code ? { ...item, quantity: item?.quantity - 1 } : item
            );
            updatedCart = updatedCart.filter(item => item.quantity > 0)
            return updatedCart;
        });
    };
    const addQuantity = (sku_code) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.product.sku_code === sku_code ? { ...item, quantity: item?.quantity + 1 } : item,
            );
            return updatedCart;
        });
    };

    const checkProductExist = (sku_code) => {
        if (cart.find(item => item?.product?.sku_code === sku_code)) {
            return true
        } else {
            return false
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, minQuantity, checkProductExist, addQuantity, products, getProducts, loading }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
