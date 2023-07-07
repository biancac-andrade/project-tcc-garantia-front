import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import SignupPage from './components/Signup';
import { WelcomeFunc } from './components/WelcomeFuncionario';
import { WelcomeAdmin } from './components/WelcomeAdmin';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import RemoveUser from './components/RemoveUser';
import ProductTable from './components/produtos/ProductTable';
import { SolicitaCard } from './components/Solicitação/SolicitaCard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função para verificar a autenticação
  const checkAuthentication = () => {
    // Implemente a lógica de verificação de autenticação aqui
    // Exemplo: Verificar se o usuário tem um token válido armazenado no local storage ou em cookies
    const token = localStorage.getItem('token');

    // Faz uma requisição à API para verificar a validade do token
    fetch('/api/check-authentication', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(error => {
        console.error('Erro ao verificar a autenticação:', error);
        setIsAuthenticated(false);
      });
  };

  // Chame a função checkAuthentication na inicialização do componente
  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <AuthProvider>
     <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/profile"
        element={<PrivateRoute component={ProfilePage} isAuthenticated={isAuthenticated} />}
      />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route exact path="/welcomeFunc" element={< WelcomeFunc />} />
      <Route exact path="/welcomeAdmin" element={< WelcomeAdmin />} />
      <Route exact path="/removeUser" element={< RemoveUser/>} />
      <Route exact path="/signup" element={< SignupPage />} />
      <Route exact path="/products" element={< ProductTable />} />
      <Route exact path="/solicita" element={< SolicitaCard />} />
    </Routes>
  </Router>
    </AuthProvider>
  );
};

export default App;
