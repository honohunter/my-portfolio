import React from 'react';
import clsx from 'clsx';
import SimpleBar from 'simplebar-react';
import { wrapGrid } from 'animate-css-grid';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, Container, Chip, Typography, Grid, ButtonBase } from '@material-ui/core';

import Card from '../components/portfolioCard';
import { filterQueryByName } from '../utils';
import portfolioList from '../assets/data/portfolio.json';

const useStyles = makeStyles(theme => ({
  root: {
    // overflow: 'hidden',
    padding: theme.spacing(9, 0),
  },
  header: {
    maxWidth: 540,
    textAlign: 'center',
    margin: 'auto',
    paddingBottom: theme.spacing(3),
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
  },
  chip: {
    width: 100,
  },
  gallery: {
    paddingTop: theme.spacing(3),
    '& > *': {
      margin: 'auto',
    },
  },
  chipTag: {
    textTransform: 'capitalize',
    '& .MuiChip-clickable:hover, .MuiChip-clickable:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const getUniqueElements = element => {
  const elements = [];
  portfolioList.forEach(ele => {
    elements.push(...ele[element]);
  });
  return [...new Set(elements)];
};

export default function Portfolio() {
  const classes = useStyles();
  const ref = React.useRef();
  const [tagsFilter, setTagsFilter] = React.useState([]);

  // const uniqueTags = getUniqueElements('tags');
  const uniqueTags = [];
  const uniqueTech = getUniqueElements('technologies');
  // const uniqueTech = [];

  const { images } = useStaticQuery(graphql`
    {
      images: allFile(filter: { extension: { eq: "png" }, relativeDirectory: { eq: "portfolio" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(formats: WEBP, layout: CONSTRAINED, placeholder: BLURRED)
            }
            name
          }
        }
      }
    }
  `);

  const handleFilter = event => {
    if (event.target.textContent === 'All') {
      setTagsFilter([]);
      return;
    }
    if (tagsFilter.includes(event.target.textContent)) {
      setTagsFilter([...tagsFilter.filter(item => item !== event.target.textContent)]);
      return;
    }
    setTagsFilter([...tagsFilter, event.target.textContent]);
  };

  React.useEffect(() => {
    if (ref) {
      setTimeout(() => {
        wrapGrid(ref.current, { duration: 500 });
      }, 100);
    }
  }, [ref]);

  return (
    <SimpleBar style={{ height: '100%' }}>
      <div className={clsx(classes.root)}>
        <Container>
          <div className={clsx(classes.header, 'animate__animated', 'animate__fadeIn')}>
            <Chip color="primary" label="WORKS" className={classes.chip} />
            <Typography variant="h2">My Portfolio</Typography>
            <Typography>
              Pixel perfect websites and dashboards, made based on provided designs with React.js recent technologies
            </Typography>
          </div>
          <div>
            <Grid container spacing={1} justify="center">
              <Grid item>
                <Chip
                  clickable
                  color={tagsFilter.length === 0 ? 'primary' : 'default'}
                  label="All"
                  onClick={handleFilter}
                />
              </Grid>
              {[...uniqueTags, ...uniqueTech].map(ele => (
                <Grid key={ele} item>
                  <Chip
                    clickable
                    color={tagsFilter.includes(ele) ? 'primary' : 'default'}
                    label={ele}
                    onClick={handleFilter}
                    className={classes.chipTag}
                  />
                </Grid>
              ))}
              
            </Grid>
          </div>

          <div className={classes.gallery}>
            <Grid container spacing={3} ref={ref}>
              {portfolioList.map(
                (ele, index) =>
                  (tagsFilter.some(item => ele.technologies.includes(item) || ele.tags.includes(item)) ||
                    tagsFilter.length === 0) && (
                    <Grid item xs="auto" key={ele.title}>
                      <Card
                        img={filterQueryByName(images, ele.title)}
                        title={ele.title}
                        tags={ele.tags}
                        lightHouse={ele.lightHouse}
                        technologies={ele.technologies}
                        order={index}
                      />
                    </Grid>
                  ),
              )}
              {portfolioList.map(
                (ele, index) =>
                  (tagsFilter.some(item => ele.technologies.includes(item) || ele.tags.includes(item)) ||
                    tagsFilter.length === 0) && (
                    <Grid item xs="auto" key={ele.title}>
                      <Card
                        img={filterQueryByName(images, ele.title)}
                        title={ele.title}
                        tags={ele.tags}
                        lightHouse={ele.lightHouse}
                        technologies={ele.technologies}
                        order={index}
                      />
                    </Grid>
                  ),
              )}
            </Grid>
          </div>
        </Container>
      </div>
    </SimpleBar>
  );
}
