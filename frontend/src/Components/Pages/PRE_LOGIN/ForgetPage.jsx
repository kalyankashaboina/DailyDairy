import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Alert } from '@mui/material';
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
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#f4f4f4' }}>
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          Forgot Password
        </Typography>
        {/* Display a single message based on the message state */}
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
              sx={{ mb: 2 }}
            >
              Request Password Reset
            </Button>
            <Link to="/">Back to Login</Link>
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
              sx={{ mb: 2 }}
            >
              Verify OTP
            </Button>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleResendOtp}
              sx={{ mb: 2 }}
            >
              Resend OTP
            </Button>
            <Link to="#" onClick={() => setStep('request')}>Back to Request</Link>
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
              sx={{ mb: 2 }}
            >
              Reset Password
            </Button>
            <Link to="#" onClick={() => setStep('verify')}>Back to Verify OTP</Link>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;
