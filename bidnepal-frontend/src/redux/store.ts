import { authApi } from "@/features/auth/api/auth.api";
import {configureStore} from "@reduxjs/toolkit";;
import authReducer from "@/features/auth/slices/auth.slice";

export const store = configureStore({
    reducer: {
        // Add your reducers here
        auth:authReducer
        
        
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch