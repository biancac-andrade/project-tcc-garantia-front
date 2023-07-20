/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { StyledProvider } from './styled';
import LoginPage from './components/Usuário/Autenticação/LoginPage';
import ProfilePage from './components/ProfilePage';
import SignupPage from './components/Usuário/Autenticação/Signup';
import { WelcomeFunc } from './components/Usuário/Funcionario/WelcomeFuncionario';
import { WelcomeAdmin } from './components/Usuário/Admin/WelcomeAdmin';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routes/PrivateRoute';
import ProductTable from './components/produtos/ProductTable';
import { SolicitaCard } from './components/Solicitação/SolicitaCard';
import { ProductForm } from './components/Formulario/Formulário';
import { TabBar } from './components/House/TabBar';
import { Reposicao } from './components/Reposição/Reposicao';
import { Pendencia } from './components/Pendencia/Pendencia';
import { UpdateUser } from './components/Usuário/Dados/UpdateUser';
import UserList from './components/Usuário/Dados/DeleteUser/UserList';


function App() {
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
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error('Erro ao verificar a autenticação:', error);
        setIsAuthenticated(false);
      });
  };

  // Chame a função checkAuthentication na inicialização do componente
  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <StyledProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/profile"
              element={<PrivateRoute component={ProfilePage} isAuthenticated={isAuthenticated} />}
            />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route exact path="/welcomeFunc" element={<WelcomeFunc />} />
            <Route exact path="/welcomeAdmin" element={<WelcomeAdmin />} />
            <Route exact path="/signup" element={<SignupPage />} />
            <Route exact path="/products" element={<ProductTable />} />
            <Route exact path="/solicita/:id" element={<SolicitaCard />} />
            <Route exact path="/formulario" element={<ProductForm />} />
            <Route exact path="/tela" element={<TabBar />} /> 
            <Route exact path="/reposicao" element={<Reposicao />} />
            <Route exact path="/pendente" element={<Pendencia />} />
            <Route exact path="/update" element={<UpdateUser />} />
            <Route exact path="/delete" element={<UserList/>} />
          </Routes>
        </Router>
      </AuthProvider>
    </StyledProvider>
  );
}

export default App;
