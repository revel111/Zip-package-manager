import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {AuthResponse} from "./dto/AuthResponse.ts";

export const baseURL = 'http://localhost:3000/api';

const apiInstance: AxiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

apiInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});

apiInstance.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${baseURL}/users/refresh`, {withCredentials: true});
            localStorage.setItem("token", response.data.accessToken);
            return apiInstance.request(originalRequest);
        } catch (error) {
            console.log(error);
        }
    }
    throw error;
});

const api = {
    zipTypes: {
        // paginatedZipTypes: () => axios.get('/zipTypes/pages', {
        //     params: {
        //         page: 1,
        //         pageSize: 10
        //     }
        // }),
        allZipTypes: () => apiInstance.get(`/zipTypes`),
        createZipType: (name: string) => apiInstance.post(`/zipTypes`, {name}),
        deleteZipType: (id: number) => apiInstance.delete(`/zipTypes/${id}`),
        updateZipType: (id: number, name: string) => apiInstance.put(`/zipTypes/${id}`, {id, name}),
    },
    zips: {
        createZip: (name: string, types: number[], file: File | null, fileName: string) => {
            const formData = new FormData();

            formData.append('name', name);
            formData.append('types', JSON.stringify(types));
            formData.append('fileName', fileName);
            formData.append('blob', file);

            return apiInstance.post('/zips', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        getPaginatedByName: (name: string | null, page: string | null, pageSize: string | null) => {
            return apiInstance.get('/zips/paginated', {
                params: {
                    name: name,
                    page: page,
                    pageSize: pageSize
                }
            });
        },
        getByName: (name: string) => {
            return apiInstance.get('/zips/names', {
                params: {
                    name: name,
                }
            });
        },
        getTypesById: (id: number) => apiInstance.get(`/zips/${id}/types`),
        getById: (id: number) => apiInstance.get(`/zips/${id}`),
        deleteById: (id: number) => apiInstance.delete(`/zips/${id}`),
        getAll: () => apiInstance.get(`/zips`)
    },
    users: {
        getById: (id: number) => apiInstance.get(`/users/${id}`),
        getAll: () => apiInstance.get(`/users`),
        getZipsByUserId: (id: number) => apiInstance.get(`/users/${id}/zips`),
        deleteById: (id: number) => apiInstance.delete(`/users/${id}`),
        login: (email: string, password: string) => apiInstance.post(`/users/login`, {email, password}),
        register: (email: string, password: string, confirmPassword: string, nickname: string) => apiInstance.post(`/users/register`, {
            email,
            password,
            nickname,
            confirmPassword
        }),
        logout: () => apiInstance.post(`/users/logout`),
        changePassword: (ogPassword: string, changedPassword: string, confirmPassword: string) => apiInstance.put(`/users/change-password`, {
            ogPassword,
            changedPassword,
            confirmPassword
        }),
        update: (nickname: string, email: string) => apiInstance.put(`/users`, {
            nickname,
            email
        }),
    },
    index: {
        fetchStats: () => apiInstance.get(`/`),
    }
};

export default api;