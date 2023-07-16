import { CheckCircle, Delete } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export const Pendencia = () => {
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
      const response = await axios.get('http://localhost:3000/pending');

      setReplacements(response.data);

      console.log('sera solicita', response.data);
    } catch (error) {
      console.error('Erro ao buscar as substituições:', error);
    }
  };


  const handleCancelReplacement = async () => {
    try {

      const pendingStatus = statuses.find((status) => status.status_type === 'solicitacao cancelada');

      if (!pendingStatus) {
        console.error('Status "pendente" não encontrado');
        return;
      }

      const pendingData = {
        replace_date: new Date(),
        status: pendingStatus._id,
        request: id,
      };
  
      await axios.put('http://localhost:3000/pending', pendingData);
      console.log(status);

    } catch (error) {
      console.error('Erro ao enviar a substituição:', error);
    }
  };

  const handleCompleteReplacement = async () => {

    try {

      const pendingStatus = statuses.find((status) => status.status_type === 'solicitada');

      if (!pendingStatus) {
        console.error('Status "pendente" não encontrado');
        return;
      }

      const pendingData = {
        pending_date: new Date(),
        status: pendingStatus._id,
        request: id,
      };
  
      await axios.post('http://localhost:3000/replacement', pendingData);

    } catch (error) {
      console.error('Erro ao enviar a substituição:', error);
    }
  };

  return (
    <div>
      <h1>Substituições</h1>
      {replacements.map((replacement) => (
        <div key={replacement._id}>
          <h2>Data de Substituição: {new Date(replacement.pending_date).toLocaleString()}</h2>
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
            <button onClick={() => handleCancelReplacement(replacement._id)}>
              <Delete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
