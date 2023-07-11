/* eslint-disable react/react-in-jsx-scope */
// import { useNavigate } from 'react-router-dom';
 import ProductTable from '../../produtos/ProductTable';



export function WelcomeAdmin() {
  // const navigate = useNavigate(); // Obtenha o objeto history

  

  return (
    <div>
      {/*  <title>Welcome</title>
      <p>Bem-vindo, Admin </p>
      <button onClick={handleRemoveUser}>Remover Usuário</button>
      <button onClick={handleUpdateUser}>Atualizar Usuário</button>*/}
      <ProductTable /> 
    

    </div>
  );
}
