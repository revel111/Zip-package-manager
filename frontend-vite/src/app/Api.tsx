import axios, {AxiosInstance} from 'axios';

const baseURL = 'http://localhost:3000/api';

const apiInstance: AxiosInstance = axios.create({
    baseURL
});

const api = {
    zipTypes: {
        paginatedZipTypes: () => axios.get('/zipTypes/pages', {
            params: {
                page: 1,
                pageSize: 10
            }
        }),
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
        getByName: () => apiInstance.get(`/zips/paginated`)
    },
    index: {
        fetchStats: () => apiInstance.get(`/`),
    }
};

export default api;