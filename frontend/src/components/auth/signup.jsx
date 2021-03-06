/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import {
  Button, TextField, Link, Grid, Box, Typography, Container,
  FormGroup, FormControl, InputLabel, Select, MenuItem,
  Checkbox, FormControlLabel,
} from '@mui/material';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';
import userPool from '../../userPool';
import logo from '../../imgs/signupLogo.svg';
import '../../css/signup.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [school, setSchool] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [validSignup, setValidSignup] = useState(false);

  const updateSchool = (event) => {
    setSchool(event.target.value);
    console.log(school);
  };

  const checkStudent = () => {
    setIsStudent(!isStudent);
  };

  const checkFirst = () => {
    if (firstName.length === 0) {
      setValidFirstName(true);
    } else {
      setValidFirstName(false);
    }
  };
  const checkLast = () => {
    if (lastName.length === 0) {
      setValidLastName(true);
    } else {
      setValidLastName(false);
    }
  };
  const checkEmail = () => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email.toLowerCase().match(emailRegex) && email.length !== 0) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const checkPhone = () => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneNumber.match(phoneRegex) && phoneNumber.length !== 0) {
      setValidPhone(true);
    } else {
      setValidPhone(false);
    }
  };

  const checkPassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/;
    if (!password.match(passwordRegex) && password.length !== 0) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const addToMongo = () => {
    // add to mongo here
    console.log('adding to mongo...');
    const loginBody = {
      firstName,
      lastName,
      phone: phoneNumber,
      email,
      isStudent,
      isAdmin: false,
      studentSchool: school,
      password,
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginBody),
    }).then((result) => {
      console.log(result);
      if (result.status === 200) {
        // success
        navigate('/signup/success');
      } else if (result.status === 404) {
        console.log('email in use');
      } else {
        console.log('error');
      }
    });
  };

  const addToAWS = () => {
    // parse only numbers in phoneNumber
    setPhoneNumber(phoneNumber.replace(/[^0-9]/g, ''));

    userPool.signUp(
      email,
      password,
      [
        new CognitoUserAttribute({ Name: 'given_name', Value: firstName }),
        new CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
        new CognitoUserAttribute({ Name: 'phone_number', Value: `+1${phoneNumber}` }), // only US numbers valid
      ],
      null,
      (err, data) => {
        if (err) {
          console.log(err);
          // setValidSignup(true);
          setValidSignup(() => true);
        }
        console.log(data);
        addToMongo();
      },
    );
  };

  const signup = async () => {
    // if any is value is true then we know it is invalid
    if (validEmail || validFirstName || validLastName || validPhone || validPassword) {
      console.log('invalid');
      return;
    }

    setValidSignup(() => false);
    // add to AWS, will call add to Mongo
    addToAWS();
  };

  const emailHelperText = () => {
    if (validEmail) {
      return 'Must use a valid email';
    }
    if (validSignup) {
      return 'Email already in use';
    }
    return '';
  };

  return (
    <div className="signupPage">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid item>
            <img id="signupLogo" src={logo} alt="logo" />
          </Grid>
          <Typography component="h1" variant="h5">
            Create an account
          </Typography>
          <FormGroup>
            <FormControlLabel id="student" control={<Checkbox />} label="I am a student" onChange={checkStudent} />
            {isStudent
              ? (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">School</InputLabel>
                  <Select
                    value={school}
                    label="School"
                    onChange={updateSchool}
                  >
                    <MenuItem value="Cal Poly, San Luis Obispo">Cal Poly, San Luis Obispo</MenuItem>
                    <MenuItem value="Cuesta College">Cuesta College</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              )
              : '' }
          </FormGroup>
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
                  onBlur={checkFirst}
                  error={validFirstName}
                  helperText={validFirstName ? 'Please enter your first name' : ''}

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
                  onBlur={checkLast}
                  error={validLastName}
                  helperText={validLastName ? 'Please enter your last name' : ''}
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
                  error={validEmail || validSignup}
                  helperText={emailHelperText()}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  value={phoneNumber}
                  onChange={(e) => { setPhoneNumber((e.target.value).replace(/[^0-9]/g, '')); }}
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
                  helperText={validPassword ? 'Must contain at least one number, one uppercase, one lowercase, one special character and be atleast 8 characters' : ''}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Link id="toLogin" href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Button
              onClick={signup}
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
              style={{
                borderRadius: 8,
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
