import { useEffect, useState } from "react";

const useTimer = (expiresAt: number | null) => {
    const getRemainingTime = (expiresAt: number | null) => {
        if (!expiresAt) return 0;

        return Math.max(expiresAt - Date.now(), 0);
    };

    const [remainingTime, setRemainingTime] = useState(()=>getRemainingTime(expiresAt));

    useEffect(() => {
        // reset immediately when expiresAt changes
        setRemainingTime(getRemainingTime(expiresAt));
        if(!expiresAt) return;

        const intervalId = setInterval(() => {
            const timeLeft = getRemainingTime(expiresAt);
            setRemainingTime(timeLeft);
            
            if (timeLeft <= 0) clearInterval(intervalId);
            
        }, 1000);

        return () => clearInterval(intervalId);
    }, [expiresAt]);

    return remainingTime;
};

export default useTimer;