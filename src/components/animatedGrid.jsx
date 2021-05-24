/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

export default function AnimatedGrid(props) {
  const ref = React.useRef();

  React.useEffect(() => {
    if (ref) {
      const { wrapGrid } = require('animate-css-grid');
      setTimeout(() => {
        wrapGrid(ref.current, {
          duration: 500,
        });
      }, 100);
    }
  }, [ref]);

  return <Grid {...props} container  ref={ref} />;
}

AnimatedGrid.defaultProps = {
  spacing: 0,
};

AnimatedGrid.propTypes = {
  // children: PropTypes.arrayOf(PropTypes.element).isRequired,
  spacing: PropTypes.number,
};
