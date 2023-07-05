import React, { useState, useContext } from 'react';
import { Button, TextField } from '@mui/material';
import api, { setAuthToken } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate(); // Obtenha o objeto history


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

/*   const handleLogin = () => {
    api.post('/auth/login', { email, password })
      .then((response) => {
        const token = response.data.token;
        setAuthToken(token); // Configura o token JWT nas requisições
        setAuthData(token); // Armazena o token no estado global (por exemplo, usando o Context API)
      // Navegar para a página de boas-vindas após o login
      // eslint-disable-next-line no-restricted-globals
      navigate('/welcome');
      console.log('passou')
      })
      .catch((error) => {
        console.error('Erro de autenticação:', error);
        // Trate erros de autenticação
      console.log('não passou')

      });
  };
 */
  
 /*  const handleLogin = () => {
    api.post('/auth/login', { email, password })
      .then((response) => {
        const token = response.data.token;
        setAuthToken(token); // Configura o token JWT nas requisições
  
        // Fazer uma solicitação para obter os detalhes do usuário autenticado
        api.get('/user/profile')
          .then((response) => {
            console.log('Detalhes do usuário:', response.data); // Adicione este console.log para verificar a resposta da API
            const user = response.data.user;
            const role = user.role;
            
            // Agora você pode diferenciar o tipo de usuário com base no campo "role"
            if (role === 'admin') {
              // Lógica para o usuário administrador

               // Navegar para a página de boas-vindas após o login
            // eslint-disable-next-line no-restricted-globals
              navigate('/welcomeAdmin');
              
            } else if (role === 'funcionario') {
              // Lógica para o usuário funcionário

               // Navegar para a página de boas-vindas após o login
            // eslint-disable-next-line no-restricted-globals
            navigate('/welcomeFunc');
            }
  
            // Armazene as informações do usuário no estado global ou local, conforme necessário
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
  }; */

  const handleLogin = () => {
  api.post('/auth/login', { email, password })
    .then((response) => {
      const token = response.data.token;
      setAuthToken(token); // Configura o token JWT nas requisições

      // Fazer uma solicitação para obter os detalhes do usuário autenticado
      api.get('/user/profile')
        .then((response) => {
          console.log('Detalhes do usuário:', response.data);
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
      <TextField
        label="Email"
        value={email}
        onChange={handleEmailChange}
      />
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
        <Button variant="contained" color="secondary">Cadastro</Button>
      </Link>
    </div>
  );
};

export default LoginPage;
