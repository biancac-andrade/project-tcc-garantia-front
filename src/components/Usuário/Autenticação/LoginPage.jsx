import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import api, { setAuthToken } from '../../../services/api';
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthData } = useAuthContext();
  const navigate = useNavigate(); // Obtenha o objeto history

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    api
      .post('/auth/login', { email, password })
      .then((response) => {
        const token = response.data.token;

          // Armazene o token no localStorage
        localStorage.setItem('token', token);

        localStorage.setItem('userRole', response.data.role);
        
        setAuthToken(token); // Configura o token JWT nas requisições

        api
          .get('/user/profile')
          .then((response) => {
            const user = response.data;
            const role = user.role;

            // Agora você pode diferenciar o tipo de usuário com base no campo "role"
            if (role === 'admin') {
              navigate('/welcomeAdmin');
            } else if (role === 'funcionario') {
              navigate('/welcomeFunc');
            } else {
              console.error('Tipo de usuário desconhecido:', role);
              // Lógica para lidar com o tipo de usuário desconhecido
            }

            setAuthData({ token, user });
          })
          .catch((error) => {
            console.error('Erro ao obter detalhes do usuário:', error);
            // Trate erros ao obter detalhes do usuário
          });
      })
      .catch((error) => {
        console.error('Erro de autenticação:', error);
        // Trate erros de autenticação
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <TextField label="Email" value={email} onChange={handleEmailChange} />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Link to="/signup">
        <Button variant="contained" color="secondary">
          Cadastro
        </Button>
      </Link>
    </div>
  );
};

export default LoginPage;
