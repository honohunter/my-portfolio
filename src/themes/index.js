import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

import 'typeface-nunito';
import 'react-typed/dist/animatedCursor.css';
import 'animate.css';
import 'simplebar-react/dist/simplebar.min.css';

const theme = createMuiTheme({
  shadows: [],
  palette: {
    primary: {
      main: '#282c34',
      contrastText: '#fff',
      dark: '#228be6',
    },
    text: {
      secondary: '#fff',
    },
    background: {
      default: '#111',
    },
  },
  typography: {
    fontFamily: ['Nunito'],
    h1: {
      fontSize: 55,
      fontWeight: 700,
    },
    h2: {
      fontSize: 32,
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
      fontSize: 16,
    },
  },
});

export default responsiveFontSizes(theme);
