import { axiosInstance } from "./axios";

export const noteAPI = {
    getNotes: async (projectId) => {
        const response = await axiosInstance.get(`/projects/${projectId}/notes`);
        return response.data;
    },
    getNoteById: async (projectId, noteId) => {
        const response = await axiosInstance.get(`/projects/${projectId}/notes/${noteId}`);
        return response.data;
    },
    createNote: async (projectId, data) => {
        const response = await axiosInstance.post(`/projects/${projectId}/notes`, data);
        return response.data;
    },
    updateNote: async (projectId, noteId, data) => {
        const response = await axiosInstance.put(`/projects/${projectId}/notes/${noteId}`, data);
        return response.data;
    },
    deleteNote: async (projectId, noteId) => {
        const response = await axiosInstance.delete(`/projects/${projectId}/notes/${noteId}`);
        return response.data;
    }
};
