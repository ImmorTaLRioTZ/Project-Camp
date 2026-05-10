import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    withCredentials: true,
});

// Interceptor for handling refresh tokens could be added here
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle network errors or server down where error.response is undefined
        if (!error.response) {
            console.error("Network error or Server is down");
            return Promise.reject(error);
        }

        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Assuming refresh token logic is handled automatically via cookies 
                // by hitting a refresh endpoint if needed, or by the backend.
                // For now we just reject.
                return Promise.reject(error);
            } catch (e) {
                return Promise.reject(e);
            }
        }
        return Promise.reject(error);
    }
);
