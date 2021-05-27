import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import mergeRefs from 'react-merge-refs';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useInView } from 'react-intersection-observer';
import { makeStyles, Typography, ButtonBase, Grid, Chip, Link } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';

import useHover from '../hooks/useHover';
import useAnimation from '../hooks/useAnimation';

import { filterQueryByName } from '../utils';

const useStyles = makeStyles(theme => ({
  root: {
    height: 270,
    maxWidth: 360,
  },
  buttonBase: ({ order }) => ({
    width: '100%',
    height: '100%',

    backgroundColor: theme.palette.grey[900],
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
    '--animate-delay': `.${order}s`,
  }),
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing(3),
    // flexWrap: 'wrap',
  },
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(40,44,52,0.7)',
    padding: theme.spacing(3, 1),
    top: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  hoverImage: ({ isHovered }) => ({
    width: '100%',
    height: '100%',
    filter: isHovered && 'blur(1px) grayscale(0.5)',
    transition: 'all 0.5s ease',
  }),
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  chartWrapper: {
    position: 'relative',
    height: 50,
    width: 50,
    marginBottom: 5,
  },
  chartLabel: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flexGrow: 1,
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    overflowX: 'auto',
  },
  tag: {
    fontSize: 12,
    height: 20,
    marginLeft: 5,
  },
}));

const options = {
  maintainAspectRatio: false,
  cutout: '80%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};

const DoughnutChart = ({ active, value, label }) => {
  const classes = useStyles();
  const ref = React.useRef();
  const data = React.useMemo(
    () => ({
      labels: ['0', '1'],
      datasets: [
        {
          data: [value, 100 - value],
          borderColor: ['#228be6', 'transparent'],
          backgroundColor: ['rgba(34,139,230,0.5)', 'transparent'],
          borderRadius: 100,
        },
      ],
    }),
    [value],
  );

  const toggleAnimation = React.useCallback(() => {
    const chart = ref.current;
    if (chart) {
      if (!active) {
        chart.data.datasets[0].data[0] = 0;
      } else {
        chart.data.datasets[0].data[0] = value;
      }
      chart.update();
    }
  }, [active, value]);

  React.useEffect(() => {
    toggleAnimation();
  }, [toggleAnimation]);

  return React.useMemo(
    () => (
      <div className={classes.chartContainer}>
        <div className={classes.chartWrapper}>
          <Doughnut data={data} options={options} ref={ref} />
          <div className={classes.chartLabel}>
            <Typography variant="h6">{value}</Typography>
          </div>
        </div>
        <div>
          <Typography variant="caption">{label}</Typography>
        </div>
      </div>
    ),
    [classes.chartContainer, classes.chartLabel, classes.chartWrapper, data, label, value],
  );
};

export default function PortfolioCard({ img, title, tags, order, lightHouse, technologies, link }) {
  const { ref: hoverRef, isHovered, isHoveredOnce } = useHover();
  const { ref: viewRef, inView } = useInView({
    threshold: 0.1,
    initialInView: true,
  });
  // const { ref: inAnimationRef } = useAnimation({
  //   animation: inView ? 'fadeInUp' : 'fadeOutDown',
  //   duration: 500,
  //   delay: order * 100,
  //   active: true,
  // });
  // const { ref: outAnimationRef } = useAnimation({
  //   animation: 'fadeOutDown',
  //   duration: 500,
  //   delay: order * 100,
  //   active: !inView,
  // });

  const ref = React.useMemo(() => mergeRefs([hoverRef, viewRef]), [hoverRef, viewRef]);

  const classes = useStyles({ order, isHovered });

  const { logosList } = useStaticQuery(graphql`
    {
      logosList: allFile(filter: { extension: { eq: "png" }, relativeDirectory: { eq: "particles" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(formats: WEBP, height: 32, quality: 100, placeholder: BLURRED)
            }
            name
          }
        }
      }
    }
  `);

  return (
    <div ref={ref} className={classes.root}>
      <ButtonBase
        className={clsx(
          classes.buttonBase,
          'animate__animated',
          'animate__faster',
          'animate__fadeInUp',
          !inView && 'animate__fadeOutDown',
          'animate__delay-1s',
        )}
        component={Link}
        target="_blank"
        href={link}
      >
        {img && <GatsbyImage alt="picture" image={getImage(img)} className={clsx(classes.hoverImage)} />}
        {isHoveredOnce && (
          <div
            className={clsx(
              classes.container,
              'animate__animated',
              'animate__fast',
              isHovered ? 'animate__fadeIn' : 'animate__fadeOut',
            )}
          >
            <div
              className={clsx(
                // classes.header,
                'animate__animated',
                'animate__faster',
                isHovered ? 'animate__fadeInDown' : 'animate__fadeOutUp',
              )}
            >
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
            </div>
            <div
              className={clsx(
                classes.header,
                'animate__animated',
                'animate__faster',
                isHovered ? 'animate__fadeInDown' : 'animate__fadeOutUp',
              )}
            >
              {tags.map(tag => (
                <Chip key={tag} color="primary" label={tag} className={classes.tag} />
              ))}
            </div>
            <div
              className={clsx(
                'animate__animated',
                'animate__faster',
                isHovered ? 'animate__fadeInUp' : 'animate__fadeOutDown',
              )}
            >
              <Grid container justify="center" wrap="nowrap" spacing={2}>
                {technologies.map(tech => (
                  <Grid key={tech} item>
                    <GatsbyImage alt="logo" image={getImage(filterQueryByName(logosList, tech))} />
                  </Grid>
                ))}
              </Grid>
            </div>

            <div
              className={clsx(
                classes.main,
                'animate__animated',
                'animate__fast',
                isHovered ? 'animate__fadeIn' : 'animate__fadeOut',
              )}
            >
              <Grid container justify="space-evenly" wrap="nowrap" spacing={1}>
                {Object.keys(lightHouse).map(key => (
                  <Grid key={key} item>
                    <DoughnutChart label={key} active={isHovered} value={lightHouse[key]} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        )}
      </ButtonBase>
    </div>
  );
}

PortfolioCard.defaultProps = {
  technologies: [],
  lightHouse: {},
  img: null,
  tags: [],
};

PortfolioCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  img: PropTypes.any,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  order: PropTypes.number.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string),
  lightHouse: PropTypes.objectOf(PropTypes.number),
};
