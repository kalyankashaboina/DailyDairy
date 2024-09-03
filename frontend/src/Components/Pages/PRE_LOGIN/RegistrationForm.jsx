import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Container, Typography, Paper, Box, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../Redux/apis';
import { Link as RouterLink } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import TextField from './TextFeild'; // Adjust the path as needed

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  
  const watchPassword = watch('Password');

  const onSubmit = async (data) => {
    dispatch(registerUser(data));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FF6F61 0%, #FFB88C 100%)',
        padding: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <IconButton
        component={RouterLink}
        to="/"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: '#FF6F61',
          '&:hover': {
            color: '#E55544',
          },
        }}
      >
        <CloseIcon />
      </IconButton>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingX: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 2,
            borderRadius: 3,
            textAlign: 'center',
            backgroundColor: '#fff',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#FF6F61', mb: 2 }}
          >
            Create Your Account
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="First Name"
              name="FirstName"
              register={register}
              validation={{ required: 'First Name is required' }}
              errors={errors}
            />
            <TextField
              label="Last Name"
              name="LastName"
              register={register}
              validation={{ required: 'Last Name is required' }}
              errors={errors}
            />
            <TextField
              label="Email Address"
              name="Email"
              type="email"
              register={register}
              validation={{
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
              }}
              errors={errors}
            />
            <TextField
              label="Password"
              name="Password"
              type="password"
              register={register}
              validation={{ required: 'Password is required' }}
              errors={errors}
            />
            <TextField
              label="Confirm Password"
              name="ConfirmPassword"
              type="password"
              register={register}
              validation={{
                required: 'Confirm Password is required',
                validate: value => value === watchPassword || 'Passwords do not match'
              }}
              errors={errors}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                padding: 1.5,
                backgroundColor: '#FF6F61',
                '&:hover': {
                  backgroundColor: '#E55544',
                },
              }}
            >
              Register
            </Button>
            <Button
              component={RouterLink}
              to="/"
              fullWidth
              variant="outlined"
              sx={{
                fontWeight: 'bold',
                color: '#FF6F61',
                borderColor: '#FF6F61',
                '&:hover': {
                  backgroundColor: '#FFB88C',
                  borderColor: '#E55544',
                },
              }}
            >
              Go to Login
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegistrationForm;
