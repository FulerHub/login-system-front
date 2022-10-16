import instance, {API_URL} from "./api";
import axios, {AxiosResponse} from 'axios';
import {AuthResponse} from "../helpers/types";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return instance.post<AuthResponse>('auth/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return instance.post<AuthResponse>('auth/registration', {email, password})
    }

    static async logout(): Promise<void> {
        return instance.post('auth/logout')
    }

    static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
        return axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true})
    }
}