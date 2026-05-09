export const capitalizeFirstLetter = (text: string): string => {
    const trimmed = text.trim();
    if (!trimmed) return "";

    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export const camelCaseToSentence = (text: string): string => {
    const sentence = text.trim().replace(/([A-Z])/g, " $1")
    return capitalizeFirstLetter(sentence);
}