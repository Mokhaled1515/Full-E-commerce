import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./UserSlice" ;
import productReducer from './productSlide'
import cartReducer from './cartProduct'
import addressReducer from "./addressSlice"
import orderReducer from './orderSlice'
export const store = configureStore({
  reducer: {
        user: userReducer,
        product: productReducer,
        cartItem : cartReducer,
        addresses : addressReducer,
        orders : orderReducer
}})