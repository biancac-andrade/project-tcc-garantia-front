import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

const theme = createTheme();

export const CardPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Card>
          <CardContent>
            <Typography variant="h6">Card</Typography>
            <Typography variant="body2">CardContent</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Primary
            </Button>
            <Button size="small" color="secondary">
              Secondary
            </Button>
          </CardActions>
        </Card>
      </div>
    </ThemeProvider>
  );
};