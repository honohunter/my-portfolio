import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

import 'typeface-nunito';
import 'react-typed/dist/animatedCursor.css';
import 'animate.css';
import 'simplebar-react/dist/simplebar.min.css';

const theme = createMuiTheme({
  shadows: [],
  palette: {
    primary: {
      main: '#228be6',
      contrastText: '#fff',
      // dark: '#228be6',
    },
    text: {
      primary: '#fff',
    },
    background: {
      default: '#111',
    },
    grey: {
      900: '#282c34',
    },
  },
  typography: {
    fontFamily: ['Nunito'],
    fontSize: 16,
    h1: {
      fontSize: 55,
      fontWeight: 700,
    },
    h2: {
      fontSize: 32,
      fontWeight: 600,
    },
    h5: {
      fontSize: 20,
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
      fontSize: 16,
    },
    button: {
      textTransform: 'none',
    },
    caption: {
      fontSize: 12,
      fontWeight: 500,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1400,
      xl: 1920,
    },
  },
  overrides: {
    MuiChip: {
      root: {
        borderRadius: 4,
        height: 26,
        backgroundColor: '#282c34',
        color: '#fff',
      },
    },
    MuiFab: {
      root: {
        color: '#fff',
        backgroundColor: '#282c34',
        '&:hover': {
          backgroundColor: '#228be6',
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
