import styled from 'styled-components';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";


export const StyledDiv = styled.div`
  height: 100px;
  width: 250px;
  background: linear-gradient(to right, #FFD700, #FF8C00);
  margin: 20px;
`;

export const ButtonCard = styled(Button)`
  background: linear-gradient(to right, #FFD700, #FF8C00);
`

export const ContainerItem = styled(Card)`
  background: linear-gradient(to right, #FFD700, #FF8C00);
`

export const DividirPrimary = styled.div`
display: flex;
margin: 100px;
  
`;

export const DividirSecondary = styled.div`
display: flex;
margin: 100px;
  
`;

export const Dividir = styled.div`
display: flex;
flex-direction: column;
  
`;