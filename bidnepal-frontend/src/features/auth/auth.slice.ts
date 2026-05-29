import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  AuthState, AuthResponse, AuthStatus, AuthUser } from "./auth.types";
import { AUTH_STATUS } from "./auth.constants";
import { User } from "../user/user.types";

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
        updateUser: (state,action:PayloadAction<AuthUser>) => {
            state.user = action.payload
        },
        updateAvatar:(state,action:PayloadAction<string>) => {
            if(state.user)
                state.user.avatar = action.payload
        }
    },
});

export const { setAuthState, logout, setAccessToken, updateUser, updateAvatar } = authSlice.actions;
export default authSlice.reducer;