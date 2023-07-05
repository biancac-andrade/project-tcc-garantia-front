import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Substitua pela URL da sua API
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
