import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Signup from './components/signup';
import './css/App.css';
import theme from './theme';
import Login from './components/login';
import SignupSuccess from './components/signupSuccess';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<p>landing page</p>} />
            <Route path="/login" element={<Login />} exact />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/success" element={<SignupSuccess />} />
            <Route path="/forgotpassword" element={<p>forgot password</p>} />
            <Route path="/tasks" />
            <Route path="/availability" />
            <Route path="/request-off" />
            <Route path="/discussions" />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}
export default App;
