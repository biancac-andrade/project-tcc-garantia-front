import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Tipo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.product_name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <img src={product.image} style={{ width: '50px', height: '50px' }} />
              </TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.type[0].name_type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
