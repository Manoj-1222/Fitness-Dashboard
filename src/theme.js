import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4CAF50' },
    background: {
      default: '#F1F1F1',
      paper: '#fff',
    },
    secondary: { main: '#FFC107' },
    accent: { main: '#1E1E2F' },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
    fontWeightBold: 700,
  },
});

export default theme; 