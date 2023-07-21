import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const ReplacementDetailsPage = () => {
  const { id } = useParams();
  const [replacement, setReplacement] = useState(null);

  useEffect(() => {
    fetchReplacementDetails();
  }, []);

  const fetchReplacementDetails = async () => {
    try {
      const response = await api.get(`/replacement/${id}`);
      setReplacement(response.data);
    } catch (error) {
      console.error('Erro ao obter os detalhes da substituição:', error);
    }
  };

  if (!replacement) {
    return <div>Loading...</div>; // Return a loading message while fetching data
  }

  return (
    <div>
      <h1>Detalhes da Substituição</h1>
      <p>ID: {replacement._id}</p>
      <p>Data: {new Date(replacement.replace_date).toLocaleString()}</p>
      <h2>Status</h2>
      {replacement.status && replacement.status.length > 0 ? (
        <p>Status: {replacement.status[0].status_type}</p>
      ) : (
        <p>Status: N/A</p>
      )}
      <h2>Pending</h2>
      {replacement.pending.map((pending) => (
        <div key={pending._id}>
          <p>Pending Date: {new Date(pending.pending_date).toLocaleString()}</p>
          <h3>Requests</h3>
          {pending.request.map((request) => (
            <div key={request._id}>
              <p>Request Date: {new Date(request.request_date).toLocaleString()}</p>
              <p>Quantity: {request.quantity}</p>
              <h4>Product</h4>
              <p>Product Name: {request.product[0].product_name}</p>
              <p>Description: {request.product[0].description}</p>
              <img src={request.product[0].image} alt={request.product[0].product_name} />
              <p>Quantity Available: {request.product[0].quantity}</p>
              <p>Type: {request.product[0].type[0].name_type}</p>
              <h4>Status</h4>
              {request.status && request.status.length > 0 ? (
                <p>Status: {request.status[0].status_type}</p>
              ) : (
                <p>Status: N/A</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ReplacementDetailsPage;
