import { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import { CountryProvider } from './contexts/CountryContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './Pages/LoginPage';
import { ThemeProvider, createTheme } from '@mui/material';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState('grid');

  // Create theme based on dark mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#60a5fa',
      },
      secondary: {
        main: '#a78bfa',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
    document.documentElement.classList.toggle('dark', storedDarkMode);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CountryProvider>
          <AppContent
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            view={view}
            setView={setView}
          />
        </CountryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent({ darkMode, toggleDarkMode, view, setView }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { isLoggedIn, user, logout } = useAuth();
  const [guest, setGuest] = useState(false);

  const handleCountryClick = (country) => {
    if (!isLoggedIn && !guest) return;
    setSelectedCountry(country);
  };

  const handleBackClick = () => setSelectedCountry(null);

  if (!isLoggedIn && !guest) {
    return <LoginPage setGuest={setGuest} />;
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: darkMode ? '#121212' : '#f5f5f5',
      color: darkMode ? '#ffffff' : '#333333'
    }}>
      <Header
        isDarkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isLoggedIn={isLoggedIn}
        handleLogin={() => {}}
        handleLogout={logout}
        user={user}
      />
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px' }}>
        {selectedCountry ? (
          <CountryDetail
            country={selectedCountry}
            handleBackClick={handleBackClick}
            isLoggedIn={isLoggedIn}
          />
        ) : (
          <>
            <FilterBar view={view} setView={setView} />
            <CountryList handleCountryClick={handleCountryClick} view={view} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;