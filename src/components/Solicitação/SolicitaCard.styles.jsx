import { Card } from '@mui/material';
import styled from 'styled-components';

export const StyledCardContainer = styled(Card)`
  width: 60%;
  margin: 24px;
`;

export const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
`;

export const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 16px;
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
