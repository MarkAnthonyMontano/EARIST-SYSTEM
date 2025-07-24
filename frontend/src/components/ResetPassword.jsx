import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  Container,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const passwordRules = [
  { label: 'Minimum of 8 characters', test: pw => pw.length >= 8 },
  { label: 'At least one lowercase letter (e.g. abc)', test: pw => /[a-z]/.test(pw) },
  { label: 'At least one uppercase letter (e.g. ABC)', test: pw => /[A-Z]/.test(pw) },
  { label: 'At least one number (e.g. 123)', test: pw => /\d/.test(pw) },
  { label: 'At least one special character (! # $ ^ * @)', test: pw => /[!#$^*@]/.test(pw) },
];

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validations, setValidations] = useState([]);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  useEffect(() => {
    const results = passwordRules.map(rule => rule.test(newPassword));
    setValidations(results);
  }, [newPassword]);

  const isValid = validations.every(Boolean) && newPassword === confirmPassword;

  const handleUpdate = async () => {
    try {
      const person_id = localStorage.getItem("person_id");
      const response = await axios.post('http://localhost:5000/change-password', {
        person_id,
        currentPassword,
        newPassword
      });

      setMessage(response.data.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating password.");
    }
  };

  const toggleShowPassword = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          border: '1px solid #ddd',
          borderRadius: 3,
          boxShadow: 3,
          padding: 4,
          mt: 5,
          backgroundColor: '#fff',
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="maroon"
          textAlign="center"
          gutterBottom
        >
          Reset Your Password
        </Typography>

        <TextField
          label="Current Password"
          type={showPassword.current ? "text" : "password"}
          fullWidth
          margin="normal"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => toggleShowPassword("current")} edge="end">
                  {showPassword.current ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <TextField
          label="New Password"
          type={showPassword.new ? "text" : "password"}
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => toggleShowPassword("new")} edge="end">
                  {showPassword.new ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <TextField
          label="Confirm Password"
          type={showPassword.confirm ? "text" : "password"}
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPassword && confirmPassword !== newPassword}
          helperText={
            confirmPassword && confirmPassword !== newPassword ? "Passwords do not match" : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => toggleShowPassword("confirm")} edge="end">
                  {showPassword.confirm ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Typography variant="subtitle2" mt={2}>
          New Password must contain:
        </Typography>
        <List dense>
          {passwordRules.map((rule, i) => (
            <ListItem key={i} sx={{ color: validations[i] ? 'green' : 'gray' }}>
              {validations[i] ? '✔' : '❌'} {rule.label}
            </ListItem>
          ))}
        </List>

        <Typography color="warning.main" mt={2}>
          Note: you are required to change your password
        </Typography>

        {message && (
          <Typography mt={2} color="info.main" fontWeight="bold">
            {message}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          disabled={!isValid}
          onClick={handleUpdate}
        >
          Update Password
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPassword;
