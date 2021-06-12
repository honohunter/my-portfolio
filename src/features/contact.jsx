/* eslint-disable no-use-before-define */
import React from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Container,
  makeStyles,
  Chip,
  Typography,
  FormControl,
  TextField,
  Grid,
  Button,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from '@material-ui/core';

import { sendMessage } from '../api/contact';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(9, 0),
    height: '100%',
  },
  header: {
    maxWidth: 540,
    textAlign: 'center',
    margin: 'auto',
    paddingBottom: theme.spacing(6),
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
  },
  chip: {
    width: 120,
  },
  backdrop: {
    zIndex: 1000,
  },
  afterMessage: {
    flexGrow: 1,
    paddingTop: theme.spacing(10),
  },
}));

const validationSchema = yup.object({
  firstName: yup.string('Enter your first name').required('First name is required'),
  lastName: yup.string('Enter your last name').required('Last name is required'),
  subject: yup.string('Enter your subject').required('Subject is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  message: yup.string('Enter your message').required('Message is required'),
});

const initialValues = {
  firstName: '',
  lastName: '',
  subject: '',
  email: '',
  message: '',
};

export default function Contact() {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      const response = await sendMessage('contact', values);
      if (response.status === 200) {
        setSent(true);
      }
    },
  });

  return (
    <div className={classes.root}>
      <Container component={Box} height="100%" display="flex" flexDirection="column">
        <div className={clsx(classes.header, 'animate__animated', 'animate__fadeIn')}>
          <Chip color="primary" label="CONTACT" className={classes.chip} />
          <Typography variant="h2">Contact Me</Typography>
          <Typography>
            Pixel perfect websites and dashboards, made based on provided designs with React.js recent technologies
          </Typography>
        </div>
        {sent ? (
          <div className={classes.afterMessage}>
            <Typography variant="h2" align="center">
              Thank you for reaching out <br /> I will contact you back
            </Typography>
          </div>
        ) : (
          <Container maxWidth="md">
            <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
              <input type="hidden" name="form-name" value="contact" />
              <Grid container spacing={2}>
                <FormControl component={Grid} item xs={12} md={6}>
                  <TextField
                    variant="filled"
                    color="primary"
                    name="firstName"
                    label="First name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </FormControl>
                <FormControl component={Grid} item xs={12} md={6}>
                  <TextField
                    variant="filled"
                    color="primary"
                    name="lastName"
                    label="Last name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </FormControl>
                <FormControl component={Grid} item xs={12}>
                  <TextField
                    variant="filled"
                    color="primary"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </FormControl>
                <FormControl component={Grid} item xs={12}>
                  <TextField
                    variant="filled"
                    color="primary"
                    name="subject"
                    label="Subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                    helperText={formik.touched.subject && formik.errors.subject}
                  />
                </FormControl>
                <FormControl component={Grid} item xs={12}>
                  <TextField
                    variant="filled"
                    color="primary"
                    name="message"
                    label="Message"
                    multiline
                    rows={9}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                  />
                </FormControl>
                <FormControl component={Grid} item xs={12}>
                  <Button variant="contained" color="primary" size="large" onClick={formik.handleSubmit}>
                    Send Message
                  </Button>
                </FormControl>
              </Grid>
            </form>
          </Container>
        )}
      </Container>

      <Backdrop className={classes.backdrop} open={formik.isSubmitting}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
