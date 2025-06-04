import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { login as loginService, register as registerService, getProfile, setAuthToken } from '../services/authService';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
    case 'AUTH_ERROR':
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
        user: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        setAuthToken(state.token);
        try {
          const { user } = await getProfile();
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user, token: state.token },
          });
        } catch (error) {
          dispatch({
            type: 'AUTH_ERROR',
            payload: 'Authentication failed',
          });
        }
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    };

    loadUser();
  }, [state.token]);

  const login = async (credentials) => {
    try {
      const { user, token } = await loginService(credentials);
      setAuthToken(token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: error.response?.data?.message || 'Login failed',
      });
      setAuthToken(null);
    }
  };

  const register = async (credentials) => {
    try {
      const { user, token } = await registerService(credentials);
      setAuthToken(token);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: { user, token },
      });
    } catch (error) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: error.response?.data?.message || 'Registration failed',
      });
      setAuthToken(null);
    }
  };

  const logout = () => {
    setAuthToken(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 