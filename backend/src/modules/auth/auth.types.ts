export interface CreateUserDTO {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    country: string;
    phone: string;
}
export interface CreateUserResponseDTO {
    id:string
    email: string;
}