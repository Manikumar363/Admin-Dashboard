import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  AppBar,
  Toolbar,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Sample data for the table
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', imageUrl: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', imageUrl: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', imageUrl: 'https://i.pravatar.cc/150?img=3' },
];

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{
      flexGrow: 1,
      backgroundColor: '#e2ebf0', // Dark grey background for the page
      minHeight: '100vh', // Ensure background covers the viewport
    }}>
      <AppBar position="static" sx={{ backgroundColor: '#34495e' }}> {/* Accent color for AppBar */}
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Welcome, {user?.name}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{
                backgroundColor: '#34495e', // Dark background
                '& th': { // Target TableCell within TableHead
                  color: 'white', // Light text
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  borderColor: '#556c7b', // Border color
                }
              }}>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleData.map((row, index) => (
                <TableRow key={row.id} sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' }, // Subtle alternating row color
                  '& td': { // Target TableCell within TableRow
                    borderColor: '#e0e0e0', // Border color
                    padding: '12px 16px', // Adjust padding
                    color: '#333' // Dark text color for content
                  }
                }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <img src={row.imageUrl} alt="User Avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                  </TableCell>
                  <TableCell>
                    {/* Action Icons */}
                    <SettingsIcon sx={{ color: '#00bcd4', cursor: 'pointer', marginRight: '8px' }} />
                    <DeleteIcon sx={{ color: '#e57373', cursor: 'pointer' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}; 