import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import RegistrationForm from './Components/Pages/PRE_LOGIN/RegistrationForm';
import LoginForm from './Components/Pages/PRE_LOGIN/LoginPagee';
import ForgotPasswordPage from './Components/Pages/PRE_LOGIN/ForgetPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
