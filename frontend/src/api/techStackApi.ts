import api from '../lib/apiClient';

export const getTechStack = async () => {
  const response = await api.get('/tech-stack');
  return response.data;
}

export const getVisibleTechs = async () => {
  const response = await api.get(`/tech-stack/visible`);
  return response.data;
}
