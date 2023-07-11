import styled from 'styled-components';
import { TextField } from '@mui/material';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SpacedTextField = styled(TextField)`
  margin: 30px;
`;
