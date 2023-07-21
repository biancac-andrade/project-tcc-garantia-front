import { CheckCircle, Delete } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Reposicao = () => {

  const { id } = useParams();
  const [replacements, setReplacements] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const fetchStatuses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/status');
      setStatuses(response.data);
    } catch (error) {
      console.error('Erro ao buscar os status:', error);
    }
  };

  useEffect(() => {
    fetchReplacements();
    fetchStatuses();
  }, [id]);

  const fetchReplacements = async () => {
    try {
      const response = await axios.get('http://localhost:3000/replacement');

      setReplacements(response.data);

      console.log('sera solicita', response.data);
    } catch (error) {
      console.error('Erro ao buscar as reposições:', error);
    }
  };

  const handleCancelReplace= async (replaceId) => {
    try {
      const replacementStatus = statuses.find((status) => status.status_type === 'reposicao cancelada');
  
      if (!replacementStatus) {
        console.error('Status "solicitacao cancelada" não encontrado');
        return;
      }
  
      const replaceData = {
        status: replacementStatus._id,
      };
    
      await axios.put(`http://localhost:3000/replacement/status/${replaceId}`, replaceData);
      console.log('Status do pedido pendente alterado para "solicitacao cancelada"');
  
      
      fetchReplacements();
    } catch (error) {
      console.error('Erro ao alterar o status do pendente:', error);
    }
  };

  const handleCompleteReplace = async (replaceId) => {

    try {
      const replacementStatus = statuses.find((status) => status.status_type === 'concluido');
  
      if (!replacementStatus) {
        console.error('Status "solicitacao cancelada" não encontrado');
        return;
      }
  
      const replaceData = {
        status: replacementStatus._id,
      };
    
      await axios.put(`http://localhost:3000/replacement/status/${replaceId}`, replaceData);
      console.log('Status do pedido pendente alterado para "solicitacao cancelada"');
  
      
      fetchReplacements();
    } catch (error) {
      console.error('Erro ao alterar o status do pendente:', error);
    }
  };

  return (
    <div>
      <h1>Substituições</h1>
      {replacements.map((replace) => (
        <div key={replace._id}>
          <h2>Data de Substituição: {new Date(replace.replace_date).toLocaleString()}</h2>
          {Array.isArray(replace.status) && replace.status.map((status) => (
            <h3 key={status._id}>Status: {status.status_type}</h3>
          ))}
          <ul>
            {replace.pending.map((pending) => (
              <li key={pending._id}>
                <h4>Data da Solicitação: {new Date(pending.pending_date).toLocaleString()}</h4>
                <h4>Quantidade: {pending.request[0].quantity}</h4>
                {pending.request[0].product.map((product) => (
                  <ul key={product._id}>
                    <li>
                      <h5>Nome do Produto: {product.product_name}</h5>
                      <p>Descrição: {product.description}</p>
                      <p>Quantidade: {product.quantity}</p>
                      <p>
                        Imagem: <img src={product.image} alt="Imagem do produto" />
                      </p>
                      <ul>
                        {product.type.map((type) => (
                          <li key={type._id}>Tipo: {type.name_type}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                ))}
              </li>
            ))}
          </ul>
          <div>
            <button onClick={() => handleCompleteReplace(replace._id)}>
              <CheckCircle />
            </button>
            <button onClick={() => handleCancelReplace(replace._id)}>
              <Delete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
