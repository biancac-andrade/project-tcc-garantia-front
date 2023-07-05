import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const UpdateProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Carregar os dados do usuário ao abrir a página
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    // Fazer uma requisição à API para obter os dados do usuário
    axios
      .get('http://localhost:3000/user/update') // Substitua pela rota correta da sua API
      .then((response) => {
        const { name, email } = response.data;
        setName(name);
        setEmail(email);
      })
      .catch((error) => {
        console.error('Erro ao obter os dados do usuário:', error);
        setErrorMessage('Erro ao carregar os dados do usuário');
      });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUpdateProfile = () => {
    const updatedUserData = { name, email, password };

    // Fazer uma requisição à API para atualizar os dados do usuário
    axios
      .put('http://localhost:3000/user', updatedUserData) // Substitua pela rota correta da sua API
      .then((response) => {
        setSuccessMessage('Dados atualizados com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao atualizar os dados do usuário:', error);
        setErrorMessage('Erro ao atualizar os dados do usuário');
      });
  };

  return (
    <div>
      <Typography variant="h5">Update Profile</Typography>
      {successMessage && (
        <Typography variant="body1" color="primary">
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      )}
      <TextField
        label="Name"
        variant="outlined"
        margin="normal"
        value={name}
        onChange={handleNameChange}
        fullWidth
      />
      <TextField
        label="Email"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={handleEmailChange}
        fullWidth
      />
      <TextField
        label="Password"
        variant="outlined"
        margin="normal"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleUpdateProfile} fullWidth>
        Update Profile
      </Button>
    </div>
  );
};

export default UpdateProfilePage;
