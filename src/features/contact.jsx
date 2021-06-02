import React from 'react';
import clsx from 'clsx';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Container, makeStyles, Chip, Typography, FormControl, TextField, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(9, 0),
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
const encode = data =>
  Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

export default function Contact() {
  const classes = useStyles();

  const onSubmit = values => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        ...values,
      }),
    }).catch(error => console.log(error));
  };

  return (
    <div className={classes.root}>
      <Container>
        <div className={clsx(classes.header, 'animate__animated', 'animate__fadeIn')}>
          <Chip color="primary" label="CONTACT" className={classes.chip} />
          <Typography variant="h2">Contact Me</Typography>
          <Typography>
            Pixel perfect websites and dashboards, made based on provided designs with React.js recent technologies
          </Typography>
        </div>
        <Container maxWidth="md">
          <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, handleChange, handleBlur, touched, errors, handleSubmit }) => (
              <Form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contact" />
                <Grid container spacing={2}>
                  <FormControl component={Grid} item xs={12} md={6}>
                    <TextField
                      variant="filled"
                      color="primary"
                      name="firstName"
                      label="First name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </FormControl>
                  <FormControl component={Grid} item xs={12} md={6}>
                    <TextField
                      variant="filled"
                      color="primary"
                      name="lastName"
                      label="Last name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </FormControl>
                  <FormControl component={Grid} item xs={12}>
                    <TextField
                      variant="filled"
                      color="primary"
                      name="email"
                      label="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </FormControl>
                  <FormControl component={Grid} item xs={12}>
                    <TextField
                      variant="filled"
                      color="primary"
                      name="subject"
                      label="Subject"
                      value={values.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.subject && Boolean(errors.subject)}
                      helperText={touched.subject && errors.subject}
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
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.message && Boolean(errors.message)}
                      helperText={touched.message && errors.message}
                    />
                  </FormControl>
                  <FormControl component={Grid} item xs={12}>
                    <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
                      Send Message
                    </Button>
                  </FormControl>
                </Grid>
              </Form>
            )}
          </Formik>
        </Container>
      </Container>
    </div>
  );
}
