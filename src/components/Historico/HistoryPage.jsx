/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const HistoryPage = () => {

  const navigate = useNavigate();

  const [replacements, setReplacements] = useState([]);

  useEffect(() => {
    fetchReplacements();
  }, []);

  const fetchReplacements = async () => {
    try {
      const response = await api.get('/replacement');
      setReplacements(response.data);
    } catch (error) {
      console.error('Erro ao obter as substituições:', error);
    }
  };
  const handleDetalhesClick = (id) => {
    // Navigate to the ReplacementDetailsPage with the specific ID
    navigate(`/detailsHistorico/${id}`);
  };

  return (
    <div>
      <h1>Histórico de Substituições</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {replacements.map((replace) => (
              <TableRow key={replace._id}>
                <TableCell>{new Date(replace.replace_date).toLocaleString()}</TableCell>
                <TableCell>{replace.status && replace.status.length > 0 ? replace.status[0].status_type : ''}</TableCell>
                <TableCell>{replace._id.slice(0, 6)}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleDetalhesClick(replace._id)}>
                    Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HistoryPage;
