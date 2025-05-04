import { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Paper, Link,
  ThemeProvider, createTheme, alpha
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import earthImage from '../assets/earthimage.jpeg';

// Create a dark space theme
const spaceTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#60a5fa', // Bright blue accent
    },
    background: {
      default: '#000000',
      paper: alpha('#121212', 0.8), // Semi-transparent dark background
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

export default function LoginPage({ setGuest }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const success = await login(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <ThemeProvider theme={spaceTheme}>
      <div 
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${earthImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        {/* Dark overlay for better contrast - reduced blur */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(3px)',
          }}
        />
        
        {/* Exploration paragraphs outside the login box */}
        <Box 
          sx={{ 
            position: 'absolute', 
            left: { xs: '50%', md: '10%' }, 
            top: '15%',
            transform: { xs: 'translateX(-50%)', md: 'translateX(0)' },
            maxWidth: { xs: '90%', md: '350px' },
            zIndex: 1,
            textAlign: { xs: 'center', md: 'left' },
            display: { xs: 'none', md: 'block' }
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              color: 'white', 
              fontWeight: 700, 
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              mb: 2,
            }}
          >
            Explore Our World
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)', 
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              mb: 2,
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}
          >
            Dive into a journey across continents, discover fascinating cultures, and uncover data-driven insights about our beautiful planet.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)', 
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}
          >
            From vast oceans to towering mountains, experience Earth's wonders through comprehensive statistics and vivid visualizations.
          </Typography>
        </Box>
        
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, padding: { xs: 2, sm: 4 }, marginLeft: { md: 'auto' }, marginRight: { md: '10%' } }}>
          <Paper 
            elevation={12} 
            sx={{ 
              padding: 4, 
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(2, 6, 23, 0.9) 100%)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
            }}
          >
            <Box 
              display="flex" 
              flexDirection="column" 
              alignItems="center" 
              gap={2}
              sx={{ mb: 3 }}
            >
              <Typography 
                variant="h4" 
                align="center" 
                gutterBottom
                sx={{ 
                  background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  fontSize: '2.5rem',
                }}
              >
                🌍 World Explorer
              </Typography>
              <Typography 
                align="center" 
                color="text.secondary" 
                sx={{ maxWidth: '80%', opacity: 0.8 }}
              >
                Discover our planet's wonders and data
              </Typography>
            </Box>
            
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  sx: { 
                    borderRadius: 2,
                    backgroundColor: alpha('#fff', 0.05),
                    '&:hover': {
                      backgroundColor: alpha('#fff', 0.08),
                    },
                    height: 56,
                    fontSize: '1.1rem',
                  }
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: '1.1rem',
                  }
                }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  sx: { 
                    borderRadius: 2,
                    backgroundColor: alpha('#fff', 0.05),
                    '&:hover': {
                      backgroundColor: alpha('#fff', 0.08),
                    },
                    height: 56,
                    fontSize: '1.1rem',
                  }
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: '1.1rem',
                  }
                }}
              />
              
              {error && (
                <Typography 
                  color="error" 
                  sx={{ 
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    opacity: 0.9,
                  }}
                >
                  {error}
                </Typography>
              )}
              
              <Button 
                variant="contained" 
                fullWidth 
                onClick={handleLogin}
                sx={{ 
                  py: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(96, 165, 250, 0.5)',
                  background: 'linear-gradient(90deg, #4f46e5, #2563eb)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #4338ca, #1d4ed8)',
                    boxShadow: '0 4px 25px rgba(96, 165, 250, 0.6)',
                  },
                }}
              >
                Sign In
              </Button>
              
              <Link
                component="button"
                variant="body2"
                onClick={() => setGuest(true)}
                sx={{ 
                  textAlign: 'center',
                  color: alpha('#fff', 0.7),
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  '&:hover': {
                    color: '#60a5fa',
                  },
                }}
              >
                Continue as Guest
              </Link>
            </Box>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
}