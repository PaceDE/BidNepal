import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Toast } from "./toast.types";

const initialState: Toast[] = []
const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
       addToast: (state, action:PayloadAction<Toast>) => {
        state.push(action.payload)
       },
       removeToast: (state, action:PayloadAction<string>) => {
        return state.filter(toast => toast.id !== action.payload)
       }
    },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;