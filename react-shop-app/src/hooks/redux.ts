import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// {
//     order: OrderState;
//     product: ProductType;
//     cart: CartState;
//     user: any;
//     categories: CategoriesName;
//     products: ProductsType;
// }

// {
//     state: {
//         order: OrderState;
//         product: ProductType;
//         cart: CartState;
//         user: any;
//         categories: CategoriesName;
//         products: ProductsType;
//     }
// }

// useSelector(state => state.order);
// useAppSelector(state => state.product);