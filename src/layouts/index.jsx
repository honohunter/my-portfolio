import React from 'react';
import SimpleBar from 'simplebar-react';
import { ThemeProvider, CssBaseline, makeStyles } from '@material-ui/core';

import theme from '../themes/index';
import NavigationMenu from '../features/navigationMenu';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    overflow: 'auto',
    display: 'flex',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  main: {
    flexGrow: 1,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <SimpleBar style={{ height: '100vh' }}> */}
      <div className={classes.root}>
        <div className={classes.main}>{children}</div>
        <NavigationMenu />
      </div>
      {/* </SimpleBar> */}
    </ThemeProvider>
  );
};

export default Layout;
