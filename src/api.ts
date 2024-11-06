import axios from "axios";

const API_URL = "https://stg.tdh.start-tech.ae/api";

export const fetchCategories = async () => {
    const response = await axios.get(`${API_URL}/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/categories/2da6c53a-522d-485d-b77c-2fafd601ff0c`);
    console.log("response",response.data.data)
    return response.data.data.categories;
};

export const fetchItems = async (categoryId: string) => {
    const response = await axios.get(`${API_URL}/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/2da6c53a-522d-485d-b77c-2fafd601ff0c?cat=${categoryId}`);
    return response.data.data.items.data;
};

export const increaseItemQuantity = async (itemId: string) => {
    return axios.post(`${API_URL}/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/order/increase-item`, { id: itemId });
};

export const decreaseItemQuantity = async (itemId: string) => {
    return axios.post(`${API_URL}/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/order/decrease-item`, { id: itemId });
};

export const removeItem = async (itemId: string) => {
    return axios.post(`${API_URL}/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/order/remove-item`, { id: itemId });
};
