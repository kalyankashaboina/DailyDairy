import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../Redux/apis';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom

const LoginForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        Email: '',
        Password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h5">Login</Typography>
                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="Email"
                        type="email"
                        value={formData.Email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        name="Password"
                        type="password"
                        value={formData.Password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                    <Typography align="center" sx={{ mt: 2 }}>
                        <Link component={RouterLink} to="/forgot-password">
                            Forgot Password?
                        </Link>
                    </Typography>
                    <Typography align="center" sx={{ mt: 2 }}>
                        <Button
                            component={RouterLink}
                            to="/register"
                            fullWidth
                            variant="outlined"
                            color="primary"
                        >
                            Sign Up
                        </Button>
                    </Typography>
                </form>
            </Paper>
        </Container>
    );
};

export default LoginForm;
