import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  AuthState, AuthResponse, AuthStatus } from "./auth.types";
import { AUTH_STATUS } from "./auth.constants";

const initialState: AuthState = {
    user: null,
    accessToken: null,
    status: AUTH_STATUS.IDLE
};

type setAuthPayload = {
    data:AuthResponse | null,
    status:AuthStatus
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState: (state, action:PayloadAction<setAuthPayload>) => {
            state.user = action.payload.data?.user || null;
            state.accessToken = action.payload.data?.accessToken || null;
            state.status = action.payload.status
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.status = AUTH_STATUS.UNAUTHENTICATED
        },
        setAccessToken: (state,action:PayloadAction<string | null>) =>{
            state.accessToken = action.payload
        },
    },
});

export const { setAuthState, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;