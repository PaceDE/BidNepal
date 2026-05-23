import { Action, nanoid, ThunkAction } from "@reduxjs/toolkit";
import { Toast } from "./toast.types";
import { RootState } from "@/redux/store";
import { addToast, removeToast } from "./toast.slice";

export const showNotification = (toast: Omit<Toast, "id">) : ThunkAction<void, RootState, unknown, Action> => (dispatch)  => {
    
    const id = nanoid();

    dispatch(addToast({...toast, id}))

    setTimeout(() => {
        dispatch(removeToast(id))
    }, toast.duration || 3000);
}

