import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

const TextField = ({ label, name, register, validation, errors, ...rest }) => {
  return (
    <MuiTextField
      margin="normal"
      required
      fullWidth
      label={label}
      {...register(name, validation)}
      error={Boolean(errors[name])}
      helperText={errors[name]?.message}
      sx={{ 
        mb: 1, // Margin bottom
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: errors[name] ? '#f44336' : '#ddd', // Red for error
          },
          '&:hover fieldset': {
            borderColor: '#FF6F61', // Border color on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: '#FF6F61', // Border color when focused
          },
        },
        '& .MuiFormHelperText-root': {
          color: '#f44336', // Red color for error text
        },
      }}
      {...rest}
    />
  );
};

export default TextField;
