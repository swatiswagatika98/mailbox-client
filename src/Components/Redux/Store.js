import { configureStore, createReducer } from "@reduxjs/toolkit";
import StoreEmail from "./Slices/StoreEmail";


export default configureStore({
  reducer: {
    StoreEmail
  
  },
});