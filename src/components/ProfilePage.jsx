import React, { useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { authData } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user/profile');

        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao carregar o perfil do usuário:', error);
      }
    };

    if (authData && authData.token) {
      api.setAuthToken(authData.token);
      fetchUserData();
    }
  }, [authData]);

  if (!userData) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default ProfilePage;
