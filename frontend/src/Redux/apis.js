import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl, login, register, requestPasswordUrl, resendOtpUrl, resetPasswordUrl, verifyOtpUrl } from "../Utils/ApiServices";
import axios from 'axios';

export const registerUser = createAsyncThunk('/redux/registerUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + register, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk('/redux/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + login, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const requestPasswordReset = createAsyncThunk('/redux/requestPasswordReset',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + requestPasswordUrl, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Password reset request failed');
    }
  }
);

export const verifyOtp = createAsyncThunk('/redux/verifyOtp',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + verifyOtpUrl, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'OTP verification failed');
    }
  }
);

export const resetPassword = createAsyncThunk('/redux/resetPassword',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + resetPasswordUrl, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Password reset failed');
    }
  }
);

export const resendOtp = createAsyncThunk('/redux/resendOtp',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + resendOtpUrl, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Resend OTP failed');
    }
  }
);
