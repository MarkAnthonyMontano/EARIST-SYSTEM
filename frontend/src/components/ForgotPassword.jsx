import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Snackbar, Alert, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/Container.css';
import Logo from '../assets/Logo.png';
import SchoolImage from '../assets/image.png';

const socket = io("http://localhost:5000");

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'info' });

  const handleReset = () => {
    if (!email) {
      setSnack({ open: true, message: "Please enter your email.", severity: "warning" });
      return;
    }
    socket.emit("forgot-password", email);
  };

  useEffect(() => {
    socket.on("password-reset-result", (data) => {
      setSnack({
        open: true,
        message: data.message,
        severity: data.success ? "success" : "error"
      });
    });

    return () => socket.off("password-reset-result");
  }, []);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnack(prev => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${SchoolImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container style={{ display: "flex", alignItems: "center", justifyContent: "center" }} maxWidth={false}>
        <div style={{ border: "5px solid white" }} className="Container">
          <div className="Header">
            <div className="HeaderTitle">
              <div className="CircleCon">
                <img src={Logo} alt="EARIST Logo" />
              </div>
            </div>
            <div className="HeaderBody">
              <strong>EARIST</strong>
              <p>Information System</p>
            </div>
          </div>

          <div className="Body">
            <div className="TextField">
              <label htmlFor="email">Enter your registered email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
                className="border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div style={{ marginTop: "40px" }}className="Button" onClick={handleReset}>
              <span>Reset Password</span>
            </div>

            <div className="LinkContainer" style={{ marginTop: "1rem" }}>
              <p>Back to Login?</p>
              <span><Link to="/">Click here</Link></span>
            </div>
          </div>

          <div className="Footer">
            <div className="FooterText">
              &copy; 2025 EARIST Information System. All rights reserved.
            </div>
          </div>
        </div>
      </Container>

      {/* Snackbar Notification */}
      <Snackbar
        open={snack.open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snack.severity} onClose={handleClose} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgotPassword;
