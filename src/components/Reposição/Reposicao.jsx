import { CheckCircle, Delete } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Reposicao = () => {
  const [replacements, setReplacements] = useState([]);

  useEffect(() => {
    fetchReplacements();
  }, []);

  const fetchReplacements = async () => {
    try {
      const response = await axios.get('http://localhost:3000/replacement');

      setReplacements(response.data);

      console.log('sera solicita', response.data);
    } catch (error) {
      console.error('Erro ao buscar as substituições:', error);
    }
  };

  const updateReplacementStatus = async (replacementId) => {
    try {
      await axios.put(`http://localhost:3000/replacement/${replacementId}`, {
        status: 'concluído'
      });
  
      // Atualize a lista de substituições após a conclusão bem-sucedida
      fetchReplacements();
    } catch (error) {
      console.error('Erro ao atualizar o status da substituição:', error);
    }
  };

  const handleDeleteReplacement = (replacementId) => {
    // Implemente a lógica para excluir a substituição com o ID fornecido
    console.log('Excluir substituição com ID:', replacementId);
  };

  const handleCompleteReplacement = (replacementId) => {
    // Implemente a lógica para marcar a substituição como concluída com o ID fornecido
    updateReplacementStatus(replacementId);

    console.log('Marcar substituição como concluída com ID:', replacementId);
  };

  return (
    <div>
      <h1>Substituições</h1>
      {replacements.map((replacement) => (
        <div key={replacement._id}>
          <h2>Data de Substituição: {new Date(replacement.replace_date).toLocaleString()}</h2>
          {Array.isArray(replacement.status) && replacement.status.map((status) => (
  <h3 key={status._id}>Status: {status.status_type}</h3>
))}
          
          <ul>
            {replacement.request.map((request) => (
              <li key={request._id}>
                <h4>Data da Solicitação: {new Date(request.request_date).toLocaleString()}</h4>
                <h4>Quantidade: {request.quantity}</h4>
                <ul>
                  {request.product.map((product) => (
                    <li key={product._id}>
                      <h5>Nome do Produto: {product.product_name}</h5>
                      <p>Descrição: {product.description}</p>
                      <p>Quantidade: {product.quantity}</p>
                      <p>
                        Imagem: <img src={product.image} alt="Imagem do produto" />
                      </p>
                      <p>Tipo: {product.type}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div>
            <button onClick={() => handleCompleteReplacement(replacement._id)}>
              <CheckCircle />
            </button>
            <button onClick={() => handleDeleteReplacement(replacement._id)}>
              <Delete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
