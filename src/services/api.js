import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Substitua pela URL da sua API
});


// Adicione um interceptor de requisição para enviar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});


// Função para configurar o token JWT nas requisições
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
