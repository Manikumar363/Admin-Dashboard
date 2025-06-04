import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, Container, Alert, InputAdornment, Checkbox, FormControlLabel, Link } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { primaryDark, accentColor, lightText, mediumText, formBackground, pageBackgroundDark } from '../constants';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
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
    color: mediumText,
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
  userIconContainerSx: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    backgroundColor: '#556c7b',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mb: 3,
  },
  rememberMeLinkBoxSx: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    mt: 1,
    mb: 2,
    color: mediumText,
    fontSize: '0.8rem',
  },
   loginButtonSx: {
    mt: 1,
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
  signUpButtonSx: {
    color: accentColor,
    fontWeight: 'bold',
    fontSize: '0.9rem',
  }
};

export const LoginForm = () => {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      await login(values);
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
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
            onClick={() => navigate('/login')}
          >
            SIGN IN
          </Button>

          <Box sx={{ mt: 8, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Box sx={styles.userIconContainerSx}>
              <AccountCircleOutlinedIcon sx={{ fontSize: 50, color: lightText }} />
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
                id="email"
                name="email"
                label="username"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: mediumText }}>
                      <AccountCircleOutlinedIcon />
                    </InputAdornment>
                  ),
                  sx: styles.inputSx
                }}
                InputLabelProps={{ sx: styles.inputLabelSx, shrink: true }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
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

              <Box sx={styles.rememberMeLinkBoxSx}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      checked={formik.values.rememberMe}
                      onChange={formik.handleChange}
                      name="rememberMe"
                      sx={{ color: accentColor, '&.Mui-checked': { color: accentColor }, '& .MuiSvgIcon-root': { fontSize: '1rem' } }}
                    />
                  }
                  label={<Typography variant="body2" sx={{ color: mediumText, fontSize: '0.8rem' }}>Remember me</Typography>}
                />
                <Link href="#" variant="body2" sx={{ color: accentColor, alignSelf: 'center', fontSize: '0.8rem' }}>
                  Forgot your password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={styles.loginButtonSx}
                disabled={formik.isSubmitting}
              >
                LOGIN
              </Button>

              <Button
                fullWidth
                variant="text"
                sx={styles.signUpButtonSx}
                onClick={() => navigate('/register')}
              >
                DON'T HAVE AN ACCOUNT? SIGN UP
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}; 