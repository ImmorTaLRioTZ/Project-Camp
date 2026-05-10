import { axiosInstance } from "./axios";

export const taskAPI = {
    getTasks: async (projectId) => {
        const response = await axiosInstance.get(`/projects/${projectId}/tasks`);
        return response.data;
    },
    getTaskById: async (projectId, taskId) => {
        const response = await axiosInstance.get(`/projects/${projectId}/tasks/${taskId}`);
        return response.data;
    },
    createTask: async (projectId, data) => {
        let payload = data;
        let config = {};

        // If data is FormData (has attachments), Axios automatically sets the correct Content-Type with boundaries
        if (data instanceof FormData) {
            payload = data;
            config = { headers: { "Content-Type": "multipart/form-data" } };
        }

        const response = await axiosInstance.post(`/projects/${projectId}/tasks`, payload, config);
        return response.data;
    },
    updateTask: async (projectId, taskId, data) => {
        const response = await axiosInstance.put(`/projects/${projectId}/tasks/${taskId}`, data);
        return response.data;
    },
    deleteTask: async (projectId, taskId) => {
        const response = await axiosInstance.delete(`/projects/${projectId}/tasks/${taskId}`);
        return response.data;
    },
    createSubtask: async (projectId, taskId, data) => {
        const response = await axiosInstance.post(`/projects/${projectId}/tasks/${taskId}/subtasks`, data);
        return response.data;
    },
    updateSubtask: async (projectId, taskId, subtaskId, data) => {
        const response = await axiosInstance.put(`/projects/${projectId}/tasks/${taskId}/subtasks/${subtaskId}`, data);
        return response.data;
    },
    deleteSubtask: async (projectId, taskId, subtaskId) => {
        const response = await axiosInstance.delete(`/projects/${projectId}/tasks/${taskId}/subtasks/${subtaskId}`);
        return response.data;
    }
};
