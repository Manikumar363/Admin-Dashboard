import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Container, Alert, InputAdornment} from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { primaryDark, accentColor, lightText, mediumText, formBackground, pageBackgroundDark } from '../constants';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name should be of minimum 2 characters length'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  dob: Yup.date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future'),
  password: Yup.string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

// Reusable styles
const styles = {
  inputSx: {
    borderRadius: '25px',
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    backgroundColor: formBackground,
    color: lightText,
    '& fieldset': { border: 'none' },
    paddingLeft: '14px',
  },
  inputLabelSx: {
    color: mediumText,
    fontSize: '1rem',
    fontWeight: 'bold',
    position: 'relative',
    transform: 'none',
    marginBottom: '4px',
    top: 'auto',
    left: 'auto',
  },
  pageContainerSx: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: `linear-gradient(to bottom, ${accentColor} 0%, ${accentColor} 50%, ${pageBackgroundDark} 50%, ${pageBackgroundDark} 100%)`,
  },
  formContainerSx: {
    paddingTop: '60px',
    paddingX: 4,
    paddingBottom: 4,
    borderRadius: 2,
    backgroundColor: primaryDark,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 0px 20px rgba(0,0,0,0.5)',
    overflow: 'hidden',
    position: 'relative',
  },
  headerButtonSx: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: accentColor,
    '&:hover': {
      backgroundColor: accentColor,
      opacity: 0.9,
    },
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    padding: '12px 16px',
    zIndex: 1,
  },
   signUpButtonSx: {
    mt: 3,
    mb: 2,
    backgroundColor: accentColor,
     '&:hover': {
      backgroundColor: accentColor,
       opacity: 0.9,
    },
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    borderRadius: '25px',
  },
  signInButtonSx: {
    color: accentColor,
    fontWeight: 'bold',
    fontSize: '0.9rem',
  }
};

export const RegisterForm = () => {
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      dob: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await register(values);
      navigate('/login');
    },
  });

  return (
     <Box sx={styles.pageContainerSx}>
      <Container component="main" maxWidth="xs">
        <Box sx={styles.formContainerSx}>
          <Button
            variant="contained"
            fullWidth
            sx={styles.headerButtonSx}
             onClick={() => navigate('/register')}
          >
            SIGN UP
          </Button>

           <Box sx={{ mt: 8, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: '#556c7b',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <PersonOutlineOutlinedIcon sx={{ fontSize: 50, color: lightText }} />
            </Box>

            {error && (
              <Alert severity="error" sx={{ mt: 2, width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                fullWidth
                id="name"
                name="name"
                label="Full Name"
                autoComplete="name"
                autoFocus
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                 InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: mediumText }}>
                      <PersonOutlineOutlinedIcon />
                    </InputAdornment>
                  ),
                  sx: styles.inputSx
                }}
                 InputLabelProps={{ sx: styles.inputLabelSx, shrink: true }}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                 InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: mediumText }}>
                      <EmailOutlinedIcon />
                    </InputAdornment>
                ),
                sx: styles.inputSx
              }}
               InputLabelProps={{ sx: styles.inputLabelSx, shrink: true }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="dob"
              name="dob"
              label="Date of Birth"
              type="date"
              InputLabelProps={{
                shrink: true,
                sx: styles.inputLabelSx
              }}
               InputProps={{
                 startAdornment: (
                  <InputAdornment position="start" sx={{ color: mediumText }}>
                    <CalendarTodayOutlinedIcon />
                  </InputAdornment>
                ),
                sx: styles.inputSx
              }}
              value={formik.values.dob}
              onChange={formik.handleChange}
              error={formik.touched.dob && Boolean(formik.errors.dob)}
              helperText={formik.touched.dob && formik.errors.dob}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
               InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: mediumText }}>
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                sx: styles.inputSx
              }}
               InputLabelProps={{ sx: styles.inputLabelSx, shrink: true }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.signUpButtonSx}
              disabled={formik.isSubmitting}
            >
              SIGN UP
            </Button>

            <Button
              fullWidth
              variant="text"
              sx={styles.signInButtonSx}
              onClick={() => navigate('/login')}
            >
              ALREADY HAVE AN ACCOUNT? SIGN IN
            </Button>
          </Box>
          </Box>
        </Box>
      </Container>
     </Box>
  );
}; 