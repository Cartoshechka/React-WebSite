import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export interface RootState {
    auth: ReturnType<typeof authReducer>
}

export const store =  configureStore({
    reducer: {
        auth: authReducer
    }
})
