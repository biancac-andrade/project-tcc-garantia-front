/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Estado para a função (role)
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSignup = () => {
    axios
      .post('http://localhost:3000/auth/register', {
        name,
        email,
        password,
        role,
      }) // Incluir role no objeto enviado para a API
      .then((_response) => {
        setName('');
        setEmail('');
        setPassword('');
        setRole('');
        setSuccessMessage('Cadastro realizado com sucesso');
        navigate('/');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch((error) => {
        console.error('Erro durante o cadastro:', error);
      });
  };

  return (
    <div>
      <Typography variant="h5">Signup</Typography>
      {successMessage && (
        <Typography variant="body1" color="primary">
          {successMessage}
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
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="role-label">Role</InputLabel>
        <Select labelId="role-label" value={role} onChange={handleRoleChange} label="Role">
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="funcionário">Funcionário</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSignup} fullWidth>
        Signup
      </Button>
    </div>
  );
};

export default SignupPage;
