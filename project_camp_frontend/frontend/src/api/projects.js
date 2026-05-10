import { axiosInstance } from "./axios";

export const projectAPI = {
    getAllProjects: async () => {
        const response = await axiosInstance.get("/projects");
        return response.data;
    },
    getProjectById: async (projectId) => {
        const response = await axiosInstance.get(`/projects/${projectId}`);
        return response.data;
    },
    createProject: async (data) => {
        const response = await axiosInstance.post("/projects", data);
        return response.data;
    },
    getProjectMembers: async (projectId) => {
        const response = await axiosInstance.get(`/projects/${projectId}/members`);
        return response.data;
    },
    addMemberToProject: async (projectId, data) => {
        const response = await axiosInstance.post(`/projects/${projectId}/members`, data);
        return response.data;
    },
    removeMemberFromProject: async (projectId, userId) => {
        const response = await axiosInstance.delete(`/projects/${projectId}/members/${userId}`);
        return response.data;
    }
};
