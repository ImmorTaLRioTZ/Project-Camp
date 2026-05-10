import { axiosInstance } from "./axios";

export const authAPI = {
    logout: async () => {
        const response = await axiosInstance.post("/auth/logout");
        return response.data;
    },
    changePassword: async (data) => {
        const response = await axiosInstance.post("/auth/change-password", data);
        return response.data;
    }
};
