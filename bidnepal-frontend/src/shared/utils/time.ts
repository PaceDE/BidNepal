const secondsInMs = 1000;
const minutesInMs = 60*1000;
const hoursInMs = 60*60*1000;
const daysInMs = 24*60*60*1000;

export const formatTime = (milliseconds: number): string => {
    if (milliseconds <= 0) return "00:00";   

    const days = Math.floor(milliseconds / daysInMs);
    const hours = Math.floor((milliseconds % daysInMs) / hoursInMs);
    const minutes = Math.floor((milliseconds % hoursInMs) / minutesInMs);
    const seconds = Math.floor((milliseconds % minutesInMs) / secondsInMs);

    const pad = (num: number) => num.toString().padStart(2, '0');
    
    const dayPart = days > 0 ? `${days}d ` : null;
    const hourPart = hours > 0 ? `${pad(hours)}` : null;

    const timeParts = `${pad(minutes)} : ${pad(seconds)}`;

    return [dayPart, hourPart, timeParts].filter(Boolean).join(' ').trim();
}