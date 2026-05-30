"use client";
import { removeToast } from "@/features/toast/toast.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { AnimatePresence, m } from "motion/react";
import { IoClose } from "react-icons/io5";

const backgroundColors = {
    primary: {
        success: "bg-green",
        error: "bg-red",
        warning: "bg-orange",
        info: "bg-blue",
    },
    light: {
        success: "bg-green-light",
        error: "bg-red-light",
        warning: "bg-orange-light",
        info: "bg-blue-light",
    },
    bar: {
        success: "border-green",
        error: "border-red",
        warning: "border-orange",
        info: "border-blue",
    }
};

export function ToastContainer() {
    const toasts = useAppSelector((state) => state.toast);
    const dispatch = useAppDispatch();

    const handleClose = (id: string) => {
        dispatch(removeToast(id));
    };

    return (
        <div>
            <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
                <AnimatePresence>
                    {toasts.map((toast, index) => {

                        const primaryColor = backgroundColors.primary[toast.type] || backgroundColors.primary.info;
                        const lightColor = backgroundColors.light[toast.type] || backgroundColors.light.info;
                        const barColor = backgroundColors.bar[toast.type] || backgroundColors.bar.info;

                        return (

                            <m.div
                                key={toast.id}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.4}}
                                className={`relative text-primary mb-4 px-2 py-3 pr-14 ${lightColor} border-l-4 ${barColor} rounded-b-xl cursor-pointer overflow-hidden`}
                            >
                                {toast.message}

                                <IoClose onClick = {()=>handleClose(toast.id)} className="absolute top-2 right-2 text-xl text-secondary cursor-pointer md:hidden" />

                                <m.div
                                    initial={{ width: "100%" }}
                                    animate={{ width: "0%" }}
                                    transition={{ duration: toast.duration ? toast.duration / 1000 - 1 : 3, ease: "linear" }}
                                    className={`${primaryColor} absolute bottom-0 left-0 h-1 rounded-b-xl`}
                                />
                            </m.div>
                        )
                    })}
                </AnimatePresence>
            </div>

        </div >
    );
}