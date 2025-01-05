import {makeAutoObservable} from "mobx";
import {IUser} from "../app/dto/IUser.ts";
import api, {baseURL} from "../app/Api.tsx";
import axios from "axios";
import {AuthResponse} from "../app/dto/AuthResponse.ts";


export default class Store {
    user = {roles: [], id: 0, email: '', nickname: ''} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    isAdmin(): boolean {
        return this.user.roles.some(role => role.name === "admin");
    }

    async login(email: string, password: string) {
        const response = await api.users.login(email, password);
        localStorage.setItem("token", response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user);
    }

    async registration(email: string, password: string, nickname: string, confirmPassword: string) {
        await api.users.register(email, password, confirmPassword, nickname);
    }

    async logout() {
        try {
            await api.users.logout();
            localStorage.removeItem("token");
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${baseURL}/users/refresh`, {withCredentials: true});
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
};