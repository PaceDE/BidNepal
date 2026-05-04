import bcrypt from "bcrypt";
import crypto from "crypto";

export const hashValue = async (value: string, saltRounds: number = 10): Promise<string> => {
    const hashedValue = await bcrypt.hash(value, saltRounds);
    return hashedValue;
}

export const generateRandomToken = (length: number = 64): string => {
    const token = crypto.randomBytes(length*4).toString('hex');
    return token;
}