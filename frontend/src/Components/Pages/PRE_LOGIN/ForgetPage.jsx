import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordReset, verifyOtp, resetPassword, resendOtp } from '../../../Redux/apis';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState('request'); // 'request', 'verify', 'reset'
  const [formData, setFormData] = useState({
    Email: '',
    OTP: '',
    NewPassword: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' }); // 'type' can be 'info' or 'error'
  
  const { status, error } = useSelector((state) => state.auth); // Assuming the state is under 'auth' slice

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    dispatch(requestPasswordReset({ Email: formData.Email }))
      .unwrap()
      .then(() => {
        setMessage({ text: 'OTP sent to your email', type: 'info' });
        setStep('verify');
      })
      .catch((err) => {
        setMessage({ text: err.message || 'Error sending OTP', type: 'error' });
      });
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ Email: formData.Email, otp: formData.OTP }))
      .unwrap()
      .then(() => {
        setMessage({ text: 'OTP verified successfully', type: 'info' });
        setStep('reset');
      })
      .catch((err) => {
        setMessage({ text: err.message || 'Invalid or expired OTP', type: 'error' });
      });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    dispatch(resetPassword({ Email: formData.Email, otp: formData.OTP, newPassword: formData.NewPassword }))
      .unwrap()
      .then(() => {
        setMessage({ text: 'Password reset successfully', type: 'info' });
        navigate('/'); // Redirect to login page
      })
      .catch((err) => {
        setMessage({ text: err.message || 'Error resetting password', type: 'error' });
      });
  };

  const handleResendOtp = async () => {
    dispatch(resendOtp({ Email: formData.Email }))
      .unwrap()
      .then(() => {
        setMessage({ text: 'New OTP sent to your email', type: 'info' });
      })
      .catch((err) => {
        setMessage({ text: err.message || 'Error resending OTP', type: 'error' });
      });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FF6F61 0%, #FFB88C 100%)', // Background gradient
        padding: 2,
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 3,
            borderRadius: 3,
            textAlign: 'center',
            backgroundColor: '#fff',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
            background: 'linear-gradient(135deg, #FFEBE0 0%, #FFF9F2 100%)', // Soft gradient background for Paper
          }}
        >
          <Typography variant="h5" align="center" sx={{ mb: 2, color: '#FF6F61' }}>
            Forgot Password
          </Typography>
          {message.text && <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>}
          
          {step === 'request' && (
            <form onSubmit={handleRequestReset} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="Email"
                type="email"
                value={formData.Email}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mb: 2,
                  fontWeight: 'bold',
                  backgroundColor: '#FF6F61',
                  '&:hover': { backgroundColor: '#E55544' },
                }}
              >
                Request Password Reset
              </Button>
              <Link to="/" style={{ color: '#FF6F61' }}>Back to Login</Link>
            </form>
          )}
          {step === 'verify' && (
            <form onSubmit={handleVerifyOtp} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                label="OTP"
                name="OTP"
                value={formData.OTP}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mb: 2,
                  fontWeight: 'bold',
                  backgroundColor: '#FF6F61',
                  '&:hover': { backgroundColor: '#E55544' },
                }}
              >
                Verify OTP
              </Button>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleResendOtp}
                sx={{
                  mb: 2,
                  color: '#FF6F61',
                  borderColor: '#FF6F61',
                  '&:hover': { borderColor: '#E55544' },
                }}
              >
                Resend OTP
              </Button>
              <Link to="#" onClick={() => setStep('request')} style={{ color: '#FF6F61' }}>Back to Request</Link>
            </form>
          )}
          {step === 'reset' && (
            <form onSubmit={handleResetPassword} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                label="New Password"
                name="NewPassword"
                type="password"
                value={formData.NewPassword}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mb: 2,
                  fontWeight: 'bold',
                  backgroundColor: '#FF6F61',
                  '&:hover': { backgroundColor: '#E55544' },
                }}
              >
                Reset Password
              </Button>
              <Link to="#" onClick={() => setStep('verify')} style={{ color: '#FF6F61' }}>Back to Verify OTP</Link>
            </form>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
