import { CheckCircle, Delete } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



export const Pendencia = () => {
  const { id } = useParams();

  const [pendings, setPendings] = useState([]);
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
    fetchPendings();
    fetchStatuses();
  }, [id]);

  const fetchPendings = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pending');

      setPendings(response.data);

      console.log('sera solicita', response.data);
    } catch (error) {
      console.error('Erro ao buscar as substituições:', error);
    }
  };

  const handleCancelPending = async (pendingId) => {
    try {
      const pendingStatus = statuses.find((status) => status.status_type === 'solicitacao cancelada');
  
      if (!pendingStatus) {
        console.error('Status "solicitacao cancelada" não encontrado');
        return;
      }
  
      const pendingData = {
        status: pendingStatus._id,
      };
    
      await axios.put(`http://localhost:3000/pending/status/${pendingId}`, pendingData);
      console.log('Status do pedido pendente alterado para "solicitacao cancelada"');
  
      // Após alterar o status, recarregue a lista de pendentes para mostrar a mudança na interface
      fetchPendings();
    } catch (error) {
      console.error('Erro ao alterar o status do pendente:', error);
    }
  };


  const handleCompletePending = async (pendingId) => {

    try {

      const requestedStatus = statuses.find((status) => status.status_type === 'solicitada');

    if (!requestedStatus) {
      console.error('Status "solicitada" não encontrado');
      return;
    }
      
    const replacementData = {
      replace_date: new Date(),
      status: requestedStatus._id,
      pending: pendingId, 
    };

      await axios.post(`http://localhost:3000/replacement`, replacementData);
      
      console.log(replacementData);

    } catch (error) {
      console.error('Erro ao enviar a substituição:', error);
    }
  };

  return (
    <div>
      <h1>Substituições</h1>
      {pendings.map((pending) => (
        <div key={pending._id}>
          <h2>Data de Substituição: {new Date(pending.pending_date).toLocaleString()}</h2>
          {Array.isArray(pending.status) && pending.status.map((status) => (
  <h3 key={status._id}>Status: {status.status_type}</h3>
))}
          
          <ul>
          {pending.request.map((request) => (
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
                <ul>
                  {product.type.map((type) => (
                    <li key={type._id}>Tipo: {type.name_type}</li>
                  ))}
                </ul>
              </li>
            ))}
              </ul>
            </li>
          ))}
          </ul>
          <div>
            <button onClick={() => handleCompletePending(pending._id)}>
              <CheckCircle />
            </button>
            <button onClick={() => handleCancelPending(pending._id)}>
              <Delete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
