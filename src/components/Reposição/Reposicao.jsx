import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Reposicao = () => {
  const [substitutions, setSubstitutions] = useState([]);

  useEffect(() => {
    fetchSubstitutions();
  }, []);

  const fetchSubstitutions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/replacement');
      setSubstitutions(response.data);
    } catch (error) {
      console.error('Erro ao obter todas as substituições:', error);
    }
  };

  return (
    <div>
      <h1>Substituições</h1>
      {substitutions.map(substitution => (
        <div key={substitution._id}>
          <h2>Data de Reposicao: {substitution.replace_date}</h2>
          {/* Renderizar outras informações da substituição aqui */}
        </div>
      ))}
    </div>
  );
};
