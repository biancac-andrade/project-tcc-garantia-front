import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

import { useNavigate } from 'react-router-dom';
import * as Styles from './Card.styles';

const theme = createTheme();

export const CardPage = () => {
  const navigate = useNavigate(); // Obtenha o objeto navigate

  const handleClick = () => {
    navigate('/outra-pagina'); // Navegue para a outra página desejada
  };

  return (
    <ThemeProvider theme={theme}>
      <Styles.Dividir>
        <Styles.DividirPrimary>
           <Styles.StyledDiv>
              <Styles.ButtonCard onClick={handleClick}>
                <Styles.ContainerItem>
                  <CardContent>
                    <Typography variant="h6">Novo Produto</Typography>
                    <Typography variant="body2">
                      Criar novo produto não existe na lista de produtos de pedidos
                    </Typography>
                  </CardContent>
                </Styles.ContainerItem>
              </Styles.ButtonCard>
          </Styles.StyledDiv>
          <Styles.StyledDiv>
              <Styles.ButtonCard onClick={handleClick}>
                <Styles.ContainerItem>
                  <CardContent>
                    <Typography variant="h6">Solicitar Produto</Typography>
                    <Typography variant="body2">
                      Solicitar produtos faltante no deposito
                    </Typography>
                  </CardContent>
                </Styles.ContainerItem>
              </Styles.ButtonCard>
          </Styles.StyledDiv>
          <Styles.StyledDiv>
              <Styles.ButtonCard onClick={handleClick}>
                <Styles.ContainerItem>
                  <CardContent>
                    <Typography variant="h6">Confereção de Reposição</Typography>
                    <Typography variant="body2">
                      Confirmação de chegada de produto ao estoque
                    </Typography>
                  </CardContent>
                </Styles.ContainerItem>
              </Styles.ButtonCard>
          </Styles.StyledDiv>
          <Styles.StyledDiv>
              <Styles.ButtonCard onClick={handleClick}>
                <Styles.ContainerItem>
                  <CardContent>
                    <Typography variant="h6">Históricos</Typography>
                    <Typography variant="body2">
                      Lista de Historicos de pedidos e reposição
                    </Typography>
                  </CardContent>
                </Styles.ContainerItem>
              </Styles.ButtonCard>
            </Styles.StyledDiv>
        </Styles.DividirPrimary>
        <Styles.DividirSecondary>
           <Styles.StyledDiv>
              <Styles.ButtonCard onClick={handleClick}>
                <Styles.ContainerItem>
                  <CardContent>
                    <Typography variant="h6">Lista de Pendencias de Solicitação</Typography>
                    <Typography variant="body2">
                      Mostra se há algum pedido para enviar para fornecedor
                    </Typography>
                  </CardContent>
                </Styles.ContainerItem>
              </Styles.ButtonCard>
          </Styles.StyledDiv>
          <Styles.StyledDiv>
              <Styles.ButtonCard onClick={handleClick}>
                <Styles.ContainerItem>
                  <CardContent>
                    <Typography variant="h6">Enviar Pedido</Typography>
                    <Typography variant="body2">
                      Pegar solicitação de pedido e enviar para o fornecedor
                    </Typography>
                  </CardContent>
                </Styles.ContainerItem>
              </Styles.ButtonCard>
          </Styles.StyledDiv>
          <Styles.StyledDiv>
              <Styles.ButtonCard onClick={handleClick}>
                <Styles.ContainerItem>
                  <CardContent>
                    <Typography variant="h6">Cadastrar novo usuário</Typography>
                    <Typography variant="body2">
                      Somente Admins cria acesso para funcionário e admins
                    </Typography>
                  </CardContent>
                </Styles.ContainerItem>
              </Styles.ButtonCard>
          </Styles.StyledDiv>
          <Styles.StyledDiv>
              <Styles.ButtonCard onClick={handleClick}>
                <Styles.ContainerItem>
                  <CardContent>
                    <Typography variant="h6">Deletar Usuário </Typography>
                    <Typography variant="body2">
                    Somente Admins deleta acesso para funcionário e admins
                    </Typography>
                  </CardContent>
                </Styles.ContainerItem>
              </Styles.ButtonCard>
            </Styles.StyledDiv>
        </Styles.DividirSecondary>
       
      </Styles.Dividir>
      
    </ThemeProvider>
  );
};