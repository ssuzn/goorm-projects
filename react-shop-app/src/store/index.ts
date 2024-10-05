import { configureStore, createStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";
import categoriesReducer from './categories/categories.slice';
import productsReducer from './products/products.slice';
import productReducer from './products/product.slice';
import cartReducer from './cart/cart.slice';
import orderReducer from './order/order.slice';

export const store = configureStore({
    reducer: {
        order: orderReducer,
        product: productReducer,
        cart: cartReducer,
        user: userReducer,
        categories: categoriesReducer,
        products: productsReducer
    }
})

typeof (() => {
    return 'a'
})

type A = ReturnType<() => string>


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
