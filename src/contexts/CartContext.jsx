import { createContext, useContext, useState } from "react";
import { toPercentage } from '../utils/util';
const CartContext = createContext();

export function useCartContent() {
    return useContext(CartContext);
}


export function CartProvider({ children }) {
    const [notify, setNotify] = useState(0);
    const [listCart, setListCart] = useState([]);

    const addItem = (item, qty) => {
        const exist = listCart?.find(i => i.id === item.id);
        if (exist) {
            setListCart(listCart.map(i => {
                if (i.id === item.id) {
                    i.qty += qty;
                }
                i.total = i.qty * i.price;
                return i
            }))
        } else {
            const newItem = { ...item, qty, isInCart: true, total: item.price * qty };
            listCart.push(newItem)
            setListCart(listCart)
        }
        setNotify(notify + qty);
    }
    const removeItem = (item) => {
        setListCart(listCart.filter(i => i.id !== item.id))
        setNotify(notify - item.qty);
    }

    const clear = () => {
        setListCart([]);
        setNotify(0);
    }
    const isInCart = (id, isInCart) => {
        setListCart(listCart.map(i => {
            if (i.id === id) {
                i.isInCart = isInCart;
            }
            return i
        }))
    };



    const getSubTotal = () => {
        return listCart.length > 1 ? listCart.map(i => i.total).reduce((a, b) => a + b) : listCart[0].total;
    }
    const getDiscount = () => {
        let discount = listCart.length + 5;
        if (listCart >= 3) discount = 20;
        return toPercentage(getSubTotal(), discount);
    }

    const getTaxes = () => {
        return toPercentage(getSubTotal(), 16);
    }

    const getTotal = () => {
        if (listCart.length) {
            return (Number(getSubTotal()) + Number(getTaxes())) - Number(getDiscount());
        }
        return 0;
    };

    const value = { notify, setNotify, listCart, setListCart, clear, isInCart, removeItem, addItem, getTotal, getDiscount, getTaxes, getSubTotal };
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
