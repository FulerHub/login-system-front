export interface AuthResponse {
    id:string
    name:string;
    email:string;
    isActivated:boolean;
    accessToken: string;
    refreshToken: string;
}

export interface IForm {
    email:string;
    password: string;
}