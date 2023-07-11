import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h1>Substituições</h1>
      {replacements.map((replacement) => (
  <div key={replacement._id}>
    <h2>Data de Substituição: {replacement.replace_date}</h2>
    <h3>Status: {replacement.status}</h3>
    <ul>
      {replacement.request.map((request) => (
        <li key={request._id}>
          <h4>Data da Solicitação: {request.request_date}</h4>
          <h4>Quantidade: {request.quantity}</h4>
          <ul>
            {request.product.map((product) => (
              <li key={product._id}>
                <h5>Nome do Produto: {product.product_name}</h5>
                <p>Descrição: {product.description}</p>
                <p>Quantidade: {product.quantity}</p>
                <p>Imagem: <img src={product.image} alt="Imagem do produto" /></p>
                 <p>Tipo: {product.type}</p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
      ))}
    </div>
  );
};
