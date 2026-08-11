import api from './api';

// ১. সব আইটেম ফেচ করা (Get All)
export const fetchAllItems = async (params) => {
    const response = await api.get('/your-endpoint', { params });
    return response.data;
};

// ২. আইডি দিয়ে নির্দিষ্ট আইটেম ফেচ করা (Fetch By ID)
export const fetchItemById = async (id) => {
    const response = await api.get(`/your-endpoint/${id}`);
    return response.data;
};

// ৩. নতুন আইটেম তৈরি করা (Create)
export const createItem = async (data) => {
    const response = await api.post('/your-endpoint', data);
    return response.data;
};

// ৪. আইটেম আপডেট করা (Update)
export const updateItem = async (id, data) => {
    const response = await api.patch(`/your-endpoint/${id}`, data);
    return response.data;
};

// ৫. আইটেম ডিলিট করা (Delete)
export const deleteItem = async (id) => {
    const response = await api.delete(`/your-endpoint/${id}`);
    return response.data;
};

const demoService = {
    fetchAllItems,
    fetchItemById,
    createItem,
    updateItem,
    deleteItem
};

export default demoService;
