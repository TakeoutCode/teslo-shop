import { FC, ReactNode, useEffect, useReducer, useRef, useState } from 'react';

import Cookies from 'js-cookie';

import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';
export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subtotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0,

  shippingAddress: undefined,
};

interface Props {
  children: ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      const cart = JSON.parse(Cookies.get('cart') ?? '[]');
      dispatch({
        type: 'Cart - LoadCart from cookies | storage',
        payload: cart,
      });
      setIsMounted(true);
    }
  }, [isMounted]);

  useEffect(() => {
    if (Cookies.get('firstName')) {
      const shippingAddress = {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
      };
      dispatch({
        type: 'Cart - LoadAddress from Cookies',
        payload: shippingAddress,
      });
    }
  }, []);

  useEffect(() => {
    if (isMounted) Cookies.set('cart', JSON.stringify(state.cart));
  }, [state.cart, isMounted]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subtotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const orderSummary = {
      numberOfItems,
      subtotal,
      tax: subtotal * taxRate,
      total: subtotal * (taxRate + 1),
    };
    dispatch({ type: 'Cart - Update order Summary', payload: orderSummary });
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((item) => item._id === product._id);
    if (!productInCart) {
      return dispatch({
        type: 'Cart - Update products in cart',
        payload: [...state.cart, product],
      });
    }
    const productIncartButDifferentSize = state.cart.some(
      (item) => item._id === product._id && item.size === product.size
    );
    if (!productIncartButDifferentSize) {
      return dispatch({
        type: 'Cart - Update products in cart',
        payload: [...state.cart, product],
      });
    }

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      p.quantity += product.quantity;

      return p;
    });
    dispatch({
      type: 'Cart - Update products in cart',
      payload: updatedProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Change cart quantity', payload: product });
  };
  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Remove product in cart', payload: product });
  };
  const updateAddress = (address: ShippingAddress) => {
    Cookies.set('firstName', address.firstName);
    Cookies.set('lastName', address.lastName);
    Cookies.set('address', address.address);
    Cookies.set('address2', address.address2 || '');
    Cookies.set('zip', address.zip);
    Cookies.set('city', address.city);
    Cookies.set('country', address.country);
    Cookies.set('phone', address.phone);

    dispatch({ type: 'Cart - Update Address', payload: address });
  };
  return (
    <CartContext.Provider
      value={{
        ...state,

        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
