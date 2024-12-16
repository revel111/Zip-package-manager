import axios, {AxiosInstance} from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const apiInstance: AxiosInstance = axios.create({
    baseURL
});

const api = {
    zipTypes: {
        allZipTypes: () => apiInstance.get(`api/zipTypes`),
        createZipType: (name: string) => apiInstance.post(`api/zipTypes`, {name}),
        deleteZipType: (id: number) => apiInstance.delete(`api/zipTypes/${id}`),
        updateZipType: (id: number, name: string) => apiInstance.put(`api/zipTypes/${id}`, {id, name}),
        createZip: (name: string, types: number[], fileName: string) => apiInstance.post(`api/zips`, {
            name,
            types,
            fileName
        }),
    }
};

export default api;