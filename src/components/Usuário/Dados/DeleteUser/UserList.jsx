import React, { useEffect, useState } from 'react';
import api from '../../../../services/api';
import {UserTable }from './UserTable';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Buscar a lista de usuários do backend ao carregar o componente
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/user/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao obter a lista de usuários:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {

        // Configurar o token no header de autorização
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
      
        await api.delete(`/user/delete/${userId}`, config);
      // Atualizar a lista de usuários após deletar
      fetchUsers();
      console.log('deletado')
    } catch (error) {
      console.error('Erro ao deletar o usuário:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <UserTable users={users} onDelete={handleDeleteUser} />
    </div>
  );
};

export default UserList;
