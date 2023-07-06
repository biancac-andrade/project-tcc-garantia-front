import { useNavigate, Link } from 'react-router-dom';
import ProductTable from './produtos/ProductTable';

export function WelcomeAdmin() {

  const navigate = useNavigate(); // Obtenha o objeto history


  const handleRemoveUser = () => {
    navigate('/removeUser');

  };

  const handleUpdateUser = () => {
    navigate('/update');

  };


  return (
    <div>
      <title>Welcome</title>
      <p>Bem-vindo, Admin </p>
      <button onClick={handleRemoveUser}>Remover Usuário</button>
      <button onClick={handleUpdateUser}>Atualizar Usuário</button>
      < ProductTable />

    </div>
  );
}
