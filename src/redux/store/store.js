import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import productReducer from "../slices/products/productSlices";
import cartReducer from "../slices/carts/cartSlice";


const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    carts: cartReducer,
  },
});

export default store;
