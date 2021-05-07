/* eslint-disable react/display-name */
import React from 'react';
import clsx from 'clsx';
import SimpleBar from 'simplebar-react';
import { useMatch, useLocation } from '@reach/router';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import {
  makeStyles,
  Fab,
  Typography,
  useTheme,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ContactsIcon from '@material-ui/icons/Contacts';
import WorkIcon from '@material-ui/icons/Work';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles(theme => ({
  navigationMenu: {
    padding: theme.spacing(3),
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      width: 180,
      marginLeft: -180,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      height: '100%',
      '& > *:not(:last-child)': {
        paddingBottom: theme.spacing(2),
      },
    },
    [theme.breakpoints.down('sm')]: {
      // minWidth: 375,
      width: '100%',
      justifyContent: 'center',
      '& > *:not(:last-child)': {
        paddingRight: theme.spacing(2),
      },
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    marginRight: theme.spacing(2),
  },
  active: {
    backgroundColor: theme.palette.primary.dark,
  },
  bottomNavigation: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: theme.palette.primary.main,
  },
}));

const order = ['/', '/about', '/resume', '/portfolio', '/contact'];

const isElementAbove = (firstElement, lastElement) => order.indexOf(firstElement) > order.indexOf(lastElement);

const Link = React.forwardRef((props, ref) => {
  const { inputRef, ...other } = props;

  // implement `InputElement` interface
  React.useImperativeHandle(inputRef, () => ({
    focus: e => {
      // logic to focus the rendered component from 3rd party belongs her
      // contentRef.current.setSelectionRange(6, 6);
    },
    // hiding the value e.g. react-stripe-elements
  }));

  // `Component` will be your `SomeThirdPartyComponent` from below
  return (
    <div ref={ref}>
      <AniLink {...other} />
    </div>
  );
});

const EnhancedFab = ({ label, to, ...props }) => {
  const classes = useStyles();
  const ref = React.useRef(null);
  const theme = useTheme();
  const match = useMatch(to);
  const location = useLocation();
  const [hover, setHover] = React.useState(Boolean(match));
  const matchMobileScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const transitionDirection = isElementAbove(to, location.pathname) ? 'down' : 'up';

  const handleMouseEnter = () => {
    if (!match) setHover(true);
  };

  const handleMouseLeave = () => {
    if (!match) setHover(false);
  };

  React.useEffect(() => () => {
    if (match) {
      // ref?.current?.scrollIntoView({ block: 'center', inline: 'center' });
    }
  });

  return (
    <div className={classes.container}>
      {hover && !matchMobileScreen && (
        <div className={clsx(classes.label, 'animate__animated', 'animate__fadeInUp animate__faster')}>
          <Typography color="textSecondary" variant="h6">
            {label}
          </Typography>
        </div>
      )}

      <Fab
        {...props}
        ref={ref}
        component={Link}
        cover
        direction={transitionDirection}
        to={to}
        replace
        bg={theme.palette.primary.dark}
        variant="round"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={clsx(match && classes.active)}
        disableRipple={Boolean(match)}
        size="small"
      />
    </div>
  );
};

const NavigationMenu = () => {
  const classes = useStyles();

  return (
    // <SimpleBar>
    <div className={classes.navigationMenu}>
      <EnhancedFab color="primary" label="Home" to="/">
        <HomeIcon />
      </EnhancedFab>
      <EnhancedFab color="primary" label="About" to="/about">
        <AccountCircleIcon />
      </EnhancedFab>
      <EnhancedFab color="primary" label="Resume" to="/resume">
        <ContactsIcon />
      </EnhancedFab>
      <EnhancedFab color="primary" label="Portfolio" to="/portfolio">
        <WorkIcon />
      </EnhancedFab>
      <EnhancedFab color="primary" label="Contact" to="/contact">
        <MailIcon />
      </EnhancedFab>
    </div>
    // {/* </SimpleBar> */}
  );
};

export default function ResponsiveNavigationMenu() {
  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return matches ? (
    <SimpleBar>
      <NavigationMenu />
    </SimpleBar>
  ) : (
    <NavigationMenu />
  );
}
