import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RemoveUser = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // Buscar a lista de usuários da API quando a página for carregada
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const token = 'seu-token-de-autenticacao'; // Substitua pelo seu token de autenticação
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get('http://localhost:3000/user/profile', config);
      if (Array.isArray(response.data)) {
        setUsers(response.data); // Atualiza o estado com os dados dos usuários
      } else {
        console.error('Resposta inválida da API - Lista de usuários não encontrada');
      }
    } catch (error) {
      console.error('Erro ao buscar lista de usuários:', error);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      const token = 'seu-token-de-autenticacao'; // Substitua pelo seu token de autenticação
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`http://localhost:3000/user/${userId}`, config); // Rota para remover o usuário pelo ID
      fetchUserList(); // Atualiza a lista de usuários após a remoção bem-sucedida
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleRemoveUser(user._id)}>Remover</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RemoveUser;
