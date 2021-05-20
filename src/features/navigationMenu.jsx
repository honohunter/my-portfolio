/* eslint-disable react/display-name */
import React from 'react';
import clsx from 'clsx';

import { useMatch, useLocation } from '@reach/router';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { makeStyles, Fab, Typography, useTheme, useMediaQuery } from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ContactsIcon from '@material-ui/icons/Contacts';
import WorkIcon from '@material-ui/icons/Work';
import MailIcon from '@material-ui/icons/Mail';

import useHover from '../hooks/useHover';

const useStyles = makeStyles(theme => ({
  navigationMenu: {
    padding: theme.spacing(3),
    display: 'flex',
    position: 'fixed',
    [theme.breakpoints.up('md')]: {
      width: 180,
      // marginLeft: -180,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      height: '100%',
      top: 0,
      right: 16,
      '& > *:not(:last-child)': {
        paddingBottom: theme.spacing(2),
      },
    },
    [theme.breakpoints.down('sm')]: {
      bottom: 0,
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
    backgroundColor: theme.palette.primary.main,
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

const Link = React.forwardRef((props, ref) => (
  // `Component` will be your `SomeThirdPartyComponent` from below
  <div ref={ref}>
    <AniLink {...props} />
  </div>
));

const EnhancedFab = ({ label, to, ...props }) => {
  const classes = useStyles();
  const theme = useTheme();
  const match = useMatch(to);
  const location = useLocation();
  // const [hover, setHover] = React.useState(Boolean(match));
  const { ref: hoverRef, isHovered } = useHover();

  const matchMobileScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const transitionDirection = isElementAbove(to, location.pathname) ? 'down' : 'up';

  React.useEffect(() => () => {
    if (match) {
      // ref?.current?.scrollIntoView({ block: 'center', inline: 'center' });
    }
  });

  return (
    <div className={classes.container}>
      {isHovered && !matchMobileScreen && (
        <div className={clsx(classes.label, 'animate__animated', 'animate__fadeInUp animate__faster')}>
          <Typography variant="h6">{label}</Typography>
        </div>
      )}

      <Fab
        {...props}
        ref={hoverRef}
        component={Link}
        variant="round"
        className={clsx(match && classes.active)}
        disableRipple={Boolean(match)}
        size={matchMobileScreen ? 'small' : 'large'}
        color="default"
        direction={transitionDirection}
        to={to}
        replace
        bg={theme.palette.primary.main}
        cover
      />
    </div>
  );
};

export default function NavigationMenu() {
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
}
