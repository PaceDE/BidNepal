import Tokens from "csrf"

const tokens = new Tokens();
const csrfService={
    generateSecret:()=>{
        return tokens.secretSync();
    },
    generateToken: (secret: string) => {
        return tokens.create(secret);
    },
    verifyToken: (secret: string, token: string) => {
        return tokens.verify(secret, token);
    }
}

export default csrfService;