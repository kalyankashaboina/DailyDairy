import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Paper, Link, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../Redux/apis';
import { Link as RouterLink } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(loginUser(data));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        padding: 2,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            textAlign: 'center',
            backgroundColor: '#fff',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#6a11cb', mb: 3 }}
          >
            Welcome Back!
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="Email"
              type="email"
              {...register('Email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.Email}
              helperText={errors.Email ? errors.Email.message : ''}
              sx={{ mb: 2, input: { color: '#333' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              name="Password"
              type="password"
              {...register('Password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
              error={!!errors.Password}
              helperText={errors.Password ? errors.Password.message : ''}
              sx={{ mb: 3, input: { color: '#333' } }}
            />
            <Button
             component={RouterLink}
                to="/homepage"
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                padding: 1.5,
                backgroundColor: '#2575fc',
                '&:hover': {
                  backgroundColor: '#1a5bb5',
                },
              }}
            >
              Login
            </Button>
            <Typography sx={{ mt: 2 }}>
              <Link
                component={RouterLink}
                to="/forgot-password"
                sx={{ color: '#2575fc', textDecoration: 'none', fontWeight: 'bold' }}
              >
                Forgot Password?
              </Link>
            </Typography>
            <Typography sx={{ mt: 3 }}>
              <Button
                component={RouterLink}
                to="/register"
                fullWidth
                variant="outlined"
                sx={{
                  fontWeight: 'bold',
                  color: '#2575fc',
                  borderColor: '#2575fc',
                  '&:hover': {
                    backgroundColor: '#e6f0ff',
                    borderColor: '#1a5bb5',
                  },
                }}
              >
                Sign Up
              </Button>
            </Typography>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginForm;
