import React, { Component } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.state = { hasError: true, error, errorInfo };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: 3,
          }}
        >
          <Paper
            elevation={10}
            sx={{
              maxWidth: 600,
              padding: 5,
              textAlign: 'center',
              borderRadius: 4,
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 80, color: '#D32F2F', mb: 2 }} />
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: '#333' }}>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
              We're sorry for the inconvenience. An unexpected error has occurred.
            </Typography>
            {this.state.error && (
              <Box sx={{ 
                mb: 3, 
                p: 2, 
                bgcolor: '#FFF3E0', 
                borderRadius: 2,
                textAlign: 'left',
                maxHeight: 200,
                overflow: 'auto' 
              }}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#E65100' }}>
                  {this.state.error.toString()}
                </Typography>
              </Box>
            )}
            <Button
              variant="contained"
              onClick={this.handleReset}
              sx={{
                backgroundColor: '#6A1B9A',
                '&:hover': { backgroundColor: '#8E24AA' },
                textTransform: 'none',
                fontSize: 16,
                padding: '10px 30px',
              }}
            >
              Reload Application
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
