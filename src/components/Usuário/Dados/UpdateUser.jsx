import React, { useState } from 'react';
import api from '../../../services/api';

export const UpdateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.put('/user/update', { name, email, password });
      alert('Dados do usuário atualizados com sucesso');
      // Aqui você pode adicionar lógica para redirecionar para outra página ou atualizar a interface.
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
      alert('Erro ao atualizar dados do usuário');
    }
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

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Nova senha"
        value={password}
        onChange={handlePasswordChange}
      />
      <button type="submit">Atualizar</button>
    </form>
  );
};
