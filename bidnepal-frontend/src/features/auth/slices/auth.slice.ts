import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  AuthState, LoginResponse } from "../types";

const initialState: AuthState = {
    user: null,
    accessToken: null,
    status: 'idle',
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action:PayloadAction<LoginResponse>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.status = 'authenticated';
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.status = 'idle';
        },
        expired: (state) => {
            state.status = 'expired';
        }
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;