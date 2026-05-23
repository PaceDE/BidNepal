import crypto from 'crypto';

export const generateRandomToken = (length: number = 64): string => {
    const token = crypto.randomBytes(length/2).toString('hex');
    return token;
}