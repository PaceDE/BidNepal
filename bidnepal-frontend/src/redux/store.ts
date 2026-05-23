import {configureStore} from "@reduxjs/toolkit";;
import authReducer from "@/features/auth/auth.slice";
import toastReducer from "@/features/toast/toast.slice";

export const store = configureStore({
    reducer: {
        auth:authReducer,
        toast:toastReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch