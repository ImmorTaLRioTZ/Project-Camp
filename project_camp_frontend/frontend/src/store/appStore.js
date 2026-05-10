import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "../features/Header/headerSlice.js"

export const store = configureStore({
    reducer: {
        headerVariables: headerReducer, 
    }
});