import React from 'react';
import clsx from 'clsx';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';
import Particles from 'react-tsparticles';
import Typed from 'react-typed';
import { Avatar, Button, Container, Hidden, Link, makeStyles, Typography } from '@material-ui/core';

import attachedFile from '../assets/attachment/CV.pdf';

const option = {
  autoPlay: true,
  background: {
    color: { value: '#111' },
    image: '',
    position: '50% 50%',
    repeat: 'no-repeat',
    size: 'cover',
    opacity: 1,
  },
  backgroundMask: { composite: 'destination-out', cover: { color: { value: '#fff' }, opacity: 1 }, enable: false },
  fullScreen: { enable: true, zIndex: -1 },
  detectRetina: true,
  fpsLimit: 60,
  infection: { cure: false, delay: 0, enable: false, infections: 0, stages: [] },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: { enable: false, mode: 'repulse' },
      onDiv: { selectors: [], enable: false, mode: [], type: 'circle' },
      onHover: { enable: false, mode: 'bubble', parallax: { enable: false, force: 2, smooth: 10 } },
      resize: true,
    },
    modes: {
      attract: { distance: 200, duration: 0.4, speed: 1 },
      bounce: { distance: 200 },
      bubble: { distance: 400, duration: 0.3, opacity: 1, size: 4 },
      connect: { distance: 80, links: { opacity: 0.5 }, radius: 60 },
      grab: { distance: 400, links: { blink: false, consent: false, opacity: 0.5 } },
      light: {
        area: { gradient: { start: { value: '#ffffff' }, stop: { value: '#000000' } }, radius: 1000 },
        shadow: { color: { value: '#000000' }, length: 2000 },
      },
      push: { quantity: 4 },
      remove: { quantity: 2 },
      repulse: { distance: 200, duration: 0.4, speed: 1 },
      slow: { factor: 3, radius: 200 },
      trail: { delay: 1, quantity: 1 },
    },
  },
  manualParticles: [],
  motion: { disable: false, reduce: { factor: 4, value: true } },
  particles: {
    bounce: {
      horizontal: { random: { enable: false, minimumValue: 0.1 }, value: 1 },
      vertical: { random: { enable: false, minimumValue: 0.1 }, value: 1 },
    },
    collisions: {
      bounce: {
        horizontal: { random: { enable: false, minimumValue: 0.1 }, value: 1 },
        vertical: { random: { enable: false, minimumValue: 0.1 }, value: 1 },
      },
      enable: false,
      mode: 'bounce',
      overlap: { enable: true, retries: 0 },
    },
    color: {
      value: '#fff',
      animation: {
        h: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
        s: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
        l: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
      },
    },
    destroy: {
      mode: 'none',
      split: {
        count: 1,
        factor: { random: { enable: false, minimumValue: 0 }, value: 3 },
        rate: { random: { enable: false, minimumValue: 0 }, value: { min: 4, max: 9 } },
      },
    },
    life: {
      count: 0,
      delay: { random: { enable: false, minimumValue: 0 }, value: 0, sync: false },
      duration: { random: { enable: false, minimumValue: 0.0001 }, value: 0, sync: false },
    },
    links: {
      blink: false,
      color: { value: '#ffffff' },
      consent: false,
      distance: 500,
      enable: false,
      frequency: 1,
      opacity: 0.4,
      shadow: { blur: 5, color: { value: '#00ff00' }, enable: false },
      triangles: { enable: false, frequency: 1 },
      width: 2,
      warp: false,
    },
    move: {
      angle: { offset: 45, value: 90 },
      attract: { enable: false, rotate: { x: 600, y: 1200 } },
      decay: 0,
      distance: 0,
      direction: 'bottom',
      drift: 0,
      enable: true,
      gravity: { acceleration: 9.81, enable: false, maxSpeed: 50 },
      path: { clamp: true, delay: { random: { enable: false, minimumValue: 0 }, value: 0 }, enable: false },
      outModes: { default: 'out', bottom: 'out', left: 'out', right: 'out', top: 'out' },
      random: false,
      size: false,
      speed: 2,
      straight: false,
      trail: { enable: false, length: 10, fillColor: { value: '#000000' } },
      vibrate: false,
      warp: false,
    },
    number: { density: { enable: true, area: 1000, factor: 1200 }, limit: 0, value: 400 },
    opacity: {
      random: { enable: true, minimumValue: 0.1 },
      value: { min: 0.1, max: 0.8 },
      animation: {
        count: 0,
        enable: false,
        speed: 1,
        sync: false,
        destroy: 'none',
        minimumValue: 0.1,
        startValue: 'random',
      },
    },
    reduceDuplicates: false,
    rotate: {
      random: { enable: false, minimumValue: 0 },
      value: 0,
      animation: { enable: false, speed: 0, sync: false },
      direction: 'clockwise',
      path: false,
    },
    shadow: { blur: 0.5, color: { value: '#000000' }, enable: false, offset: { x: 5, y: 5 } },
    shape: {
      options: {
        images: [],
      },
      type: 'image',
    },
    size: {
      random: { enable: true, minimumValue: 5 },
      value: { min: 5, max: 13 },
      animation: {
        count: 0,
        enable: false,
        speed: 40,
        sync: false,
        destroy: 'none',
        minimumValue: 0.1,
        startValue: 'random',
      },
    },
    stroke: { width: 0 },
    twinkle: {
      lines: { enable: false, frequency: 0.05, opacity: 1 },
      particles: { enable: false, frequency: 0.05, opacity: 1 },
    },
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  responsive: [],
  themes: [],
};

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  // particlesWrapper: {
  //   height: '100%',
  //   width: '100%',
  //   position: 'absolute',
  //   zIndex: -1,
  // },
  particles: {
    '& > *': {
      filter: 'blur(1px) grayscale(0.5) brightness(1)',
    },
  },
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.contrastText,
  },
  avatar: {
    width: 260,
    height: 260,
    border: '5px solid',
    borderColor: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(2),
  },
  button: {
    color: '#fff',
    border: '2px solid #fff',
    borderRadius: 50,
    fontWeight: 600,
    fontSize: 18,
    marginTop: theme.spacing(3),
    width: 200,
  },
}));

const InjectImagesToOption = imagesList => {
  option.particles.shape.options.images = imagesList.edges.map(({ node }) => {
    const { height, width, images } = getImage(node);
    const { src } = images.fallback;
    return { src, height, width };
  });
};

export default function Index() {
  const classes = useStyles();

  const { logosList, profilePic } = useStaticQuery(graphql`
    {
      logosList: allFile(filter: { extension: { eq: "png" }, relativeDirectory: { eq: "particles" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(formats: WEBP, height: 128)
            }
          }
        }
      }
      profilePic: file(relativePath: { eq: "mypic.png" }) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, layout: CONSTRAINED)
        }
      }
    }
  `);

  InjectImagesToOption(logosList);

  return (
    <>
      <Particles options={option} className={classes.particles} />
      <div className={clsx(classes.root, 'animate__animated', 'animate__fadeIn', 'animate__delay-1s')}>
        <Container maxWidth="xl" className={classes.container}>
          <Avatar className={classes.avatar}>
            <GatsbyImage alt="profile picture" image={getImage(profilePic)} />
          </Avatar>
          <Typography variant="h1" align="center" gutterBottom>
            Hello, I&#39;m Alaa Eddine Bouasla
          </Typography>
          <Typography variant="h2" align="center" gutterBottom>
            <Typed
              strings={['Web Application Developer', 'Frontend Web Developer']}
              typeSpeed={80}
              backSpeed={100}
              backDelay={1000}
              loop
            />
          </Typography>
          <Button
            component={Link}
            underline="none"
            href={attachedFile}
            target="_blank"
            variant="outlined"
            size="large"
            className={classes.button}
          >
            Download CV
          </Button>
        </Container>
      </div>
    </>
  );
}
