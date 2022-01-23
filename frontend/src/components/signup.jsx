/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import '../css/login.css';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const checkEmail = () => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email.toLowerCase().match(emailRegex) && email.length !== 0) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const checkPhone = () => {
    console.log(phoneNumber.match(/\d/g).length);
    if (!(phoneNumber.match(/\d/g).length === 10) && phoneNumber.length !== 0) {
      setValidPhone(true);
    } else {
      setValidPhone(false);
    }
  };

  const checkPassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!password.match(passwordRegex) && password.length !== 0) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const signup = () => {
    console.log(firstName, lastName, email, phoneNumber, password);
  };

  return (
    <div className="loginPage">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create an account
          </Typography>
          <Box component="form" noValidate onSubmit={signup} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); }}
                  onBlur={checkEmail}
                  error={validEmail}
                  helperText={validEmail ? 'Must use a valid email' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                  autoComplete="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => { setPhoneNumber(e.target.value); }}
                  onBlur={checkPhone}
                  error={validPhone}
                  helperText={validPhone ? 'Must use a valid phone number' : ''}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); }}
                  onBlur={checkPassword}
                  error={validPassword}
                  helperText={validPassword ? 'Must contain at least one number, one uppercase, one lowercase, and be atleast 8 characters' : ''}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                borderRadius: 8,
                backgroundColor: '#21b6ae',

              }}
            >
              Create account
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
