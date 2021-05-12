import React from 'react';
import clsx from 'clsx';
import SimpleBar from 'simplebar-react';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, Container, Chip, Typography, Grid } from '@material-ui/core';

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
    overflow: 'hidden',
  },
}));

export default function Portfolio() {
  const classes = useStyles();

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
          {/* <div>test</div> */}
          <div className={classes.gallery}>
            <Grid container spacing={3}>
              {portfolioList.map((ele, index) => (
                <Grid key={ele.title} item xs="auto" sm={6} lg={4}>
                  <Card
                    img={filterQueryByName(images, ele.title)}
                    title={ele.title}
                    tags={ele.tags}
                    lightHouse={ele.lightHouse}
                    technologies={ele.technologies}
                    order={index}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
      </div>
    </SimpleBar>
  );
}
