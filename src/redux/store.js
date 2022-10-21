import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from "./user/userReducer";
import { appDataReducer } from './appData/appDataReducer';
export const store = configureStore({
    reducer: {
        user: userReducer,
        appData: appDataReducer
    }
})