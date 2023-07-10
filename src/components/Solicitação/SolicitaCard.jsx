import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Collapse,
} from '@mui/material';
import { ExpandMore, Delete } from '@mui/icons-material';
import * as Styles from './SolicitaCard.styles';
import { format } from 'date-fns';

export const SolicitaCard = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate(); // Obtenha o objeto history

  useEffect(() => {
    fetchRequest();
  }, [id]); // Adicione 'id' às dependências

  const fetchRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/request/${id}`);
      // setRequest(response.data);

      const requestData = response.data;

      // Formatar a data
      const formattedDate = requestData.request_date
        ? format(
            new Date(requestData.request_date),
            "'Dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm:ss 'hrs'"
          )
        : '';

      // Atualizar o estado com os dados da solicitação e a data formatada
      setRequest({ ...requestData, formattedDate });

      console.log('sera', response);
    } catch (error) {
      console.error('Erro ao buscar os detalhes da solicitação:', error);
    }
  };

  if (!request) {
    return <p>Carregando detalhes da solicitação...</p>;
  }

  const { formattedDate, quantity, product } = request;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickGoBack = () => {
    navigate('/products');
  };

  const handleRemoveProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/request/${id}/${productId}`);

      setRequest((prevRequest) => {
        const updatedProduct = prevRequest.product.filter((item) => item._id !== productId);
        return { ...prevRequest, product: updatedProduct };
      });

      console.log('Produto removido com sucesso');
    } catch (error) {
      console.error('Erro ao remover o produto:', error);
    }
  };

  return (
    <>
      <Styles.StyledCardContainer>
        <CardHeader title={formattedDate} />
        <CardContent>
          <Typography variant="body1">Quantidade: {quantity}</Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Ver produtos"
            disabled={product.length === 0}
          >
            <ExpandMore />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {product.map((item) => (
              <Styles.StyledCard key={item._id} sx={{ mb: 2 }}>
                <Styles.StyledImage src={item.image} alt="Imagem do produto" />
                <CardContent>
                  <CardHeader title={item.product_name} />
                  <Typography variant="body2">{item.description}</Typography>
                  <Typography variant="body2">Quantidade do produto: {item.quantity}</Typography>
                  <Styles.IconsContainer>
                    <IconButton onClick={() => handleRemoveProduct(item._id)}>
                      <Delete />
                    </IconButton>
                  </Styles.IconsContainer>
                </CardContent>
              </Styles.StyledCard>
            ))}
          </CardContent>
        </Collapse>
      </Styles.StyledCardContainer>
      <div>
        <button onClick={handleClickGoBack}>Voltar para a Tabela de Produtos</button>
      </div>
    </>
  );
};
