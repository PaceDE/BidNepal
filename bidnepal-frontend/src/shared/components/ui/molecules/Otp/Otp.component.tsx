"use client";
import { Dispatch, SetStateAction, useRef, useState } from "react"

const Otp = ({otp,setOtp,length}:{otp:string[],setOtp:Dispatch<SetStateAction<string[]>>,length:number}) => {
   
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const onKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === "ArrowLeft" && idx > 0)
            inputsRef.current?.[idx - 1]?.focus();
        if (e.key === "ArrowRight" && idx < length - 1)
            inputsRef.current?.[idx + 1]?.focus();
        if (e.key === "Backspace") {
            const copy = [...otp];
            copy[idx] = ""
            setOtp(copy);
        }
        if (/^\d$/.test(e.key)) {
            e.preventDefault();
            const copy = [...otp];
            copy[idx] = e.key;
            setOtp(copy);

            if (idx < length - 1)
                inputsRef.current?.[idx + 1]?.focus();
            else
                inputsRef.current?.[idx]?.blur();

        }
    }

    const handleChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value.replace(/\D/g, "");
        console.log(value);
        if (!value) return;

        const copy = [...otp];

        for (let i = 0; i < value.length && i < length; i++) {
            copy[i] = value[i];
        }
        setOtp(copy);
        if (value.length >= length)
            inputsRef.current?.[idx]?.blur();
        else
            inputsRef.current?.[value.length]?.focus();
    }

    return (
        <div className="mt-2 flex justify-center items-center">
            {otp.map((_, idx) => {
                return (
                    <input key={idx} value={otp[idx]} onChange={(e) => handleChange(idx, e)}
                        ref={(el) => {
                            if (el) inputsRef.current[idx] = el;
                        }}

                        onKeyDown={(e) => onKeyPressed(e, idx)}
                        placeholder="_"
                        className="  size-8 mr-4 flex justify-center items-center text-center outline-2 outline-theme rounded-sm focus:placeholder-transparent"
                    />
                )
            })}
        </div>
    )
}

export default Otp;