import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, Grid, Typography } from '@mui/material';
import axios from 'axios';
//import * as Styles from './Formulario.styles';

export const ProductForm = () => {
  const [productData, setProductData] = useState({
    product_name: '',
    description: '',
    image: '',
    quantity: 0,
    type: '',
  });
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/type');
      setTypes(response.data);
    } catch (error) {
      console.error('Erro ao obter os tipos:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/product', productData);
      alert('Produto criado com sucesso!');
      setProductData({
        product_name: '',
        description: '',
        image: '',
        quantity: 0,
        type: '',
      });
    } catch (error) {
      console.error('Erro ao criar o produto:', error);
      alert('Erro ao criar o produto. Por favor, tente novamente.');
    }
  };

  return (
    <Grid container justifyContent="center" spacing={2} sx={{ mt: 4 }}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Criar novo produto
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="product_name"
            label="Nome do Produto"
            value={productData.product_name}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }} // Adiciona margem inferior de 2 unidades
          />
          <TextField
            name="description"
            label="Descrição"
            value={productData.description}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }} // Adiciona margem inferior de 2 unidades
          />
          <TextField
            name="image"
            label="URL da Imagem"
            value={productData.image}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }} // Adiciona margem inferior de 2 unidades
          />
          <TextField
            name="quantity"
            label="Quantidade"
            type="number"
            value={productData.quantity}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }} // Adiciona margem inferior de 2 unidades
          />
          <Select
            name="type"
            label="Tipo"
            value={productData.type}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }} // Adiciona margem inferior de 2 unidades
          >
            {types.map((type) => (
              <MenuItem key={type._id} value={type._id}>
                {type.name_type}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Enviar
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};