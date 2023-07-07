import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const SolicitaCard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:3000/request');
      const requestList = response.data;
      const updatedRequests = await Promise.all(
        requestList.map(async (request) => {
          const productDetails = await fetchProductDetails(request.product);
          return {
            ...request,
            products: productDetails,
          };
        })
      );
      setRequests(updatedRequests);
    } catch (error) {
      console.error('Erro ao buscar as solicitações:', error);
    }
  };

  const fetchProductDetails = async (productIds) => {
    try {
      const response = await axios.get('http://localhost:3000/product', {
        params: {
          ids: productIds,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar os detalhes do produto:', error);
      return [];
    }
  };

  const handleExpandClick = (requestId) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === requestId ? { ...request, expanded: !request.expanded } : request
      )
    );
  };

  return (
    <div>
      <h1>Página de Destino</h1>
      {requests.map((request) => (
        <Card key={request._id} sx={{ maxWidth: 345, marginBottom: '16px' }}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: red[500] }}>{request._id}</Avatar>}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={request.request_date}
            subheader={`Quantidade: ${request.quantity}`}
          />
          <CardContent>
            {Array.isArray(request.products) &&
              request.products.map((product) => (
                <Card key={product._id} sx={{ marginTop: '8px' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.product_name}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {product.product_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantidade: {product.quantity}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              onClick={() => handleExpandClick(request._id)}
              aria-expanded={request.expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={request.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>This is more information about the request.</Typography>
              <Typography paragraph>...</Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </div>
  );
};
