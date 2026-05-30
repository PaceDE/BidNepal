import { useEffect, useState } from "react";

const useTimer = (expiresAt: number | null) => {
    const getRemainingTime = () => {
        if (!expiresAt) return 0;

        return Math.max(expiresAt - Date.now(), 0);
    };

    const [remainingTime, setRemainingTime] = useState(getRemainingTime());

    useEffect(() => {
        // reset immediately when expiresAt changes
        setRemainingTime(() => getRemainingTime());

        if (!remainingTime) return;

        const intervalId = setInterval(() => {
            setRemainingTime(getRemainingTime());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [expiresAt]);

    return remainingTime;
};

export default useTimer;