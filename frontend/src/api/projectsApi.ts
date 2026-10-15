import api from '../lib/apiClient';

export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const getProjectById = async (projectId: number) => {
  const response = await api.get(`/projects/${projectId}`);
  return response.data;
};
