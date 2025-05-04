import { 
    Container, 
    Typography, 
    Grid, 
    Box, 
    CircularProgress, 
    Alert, 
    AlertTitle, 
    Button,
    Paper,
    Divider,
    ThemeProvider,
    createTheme,
    alpha
  } from '@mui/material';
  import { Public as GlobeIcon } from '@mui/icons-material';
  import CountryCard from './CountryCards';
  import { useCountries } from '../contexts/CountryContext';
  import earthImage from '../assets/earthimage.jpeg';
  
  const cosmicTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#7dd3fc', // Lighter blue for cosmic effect
      },
      secondary: {
        main: '#c4b5fd', // Softer purple for cosmic effect
      },
      background: {
        default: '#020617', // Deep space black
        paper: alpha('#030712', 0.8),
      },
      text: {
        primary: '#f8fafc',
        secondary: alpha('#f1f5f9', 0.7),
      }
    },
    typography: {
      fontFamily: '"Roboto", "Arial", sans-serif',
    },
    shape: {
      borderRadius: 16, // Slightly more rounded
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(2, 6, 23, 0.85) 100%)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(148, 163, 184, 0.12)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 8px rgba(100, 116, 139, 0.1)'
          }
        }
      }
    }
  });
  
  function CountryList({ handleCountryClick, view }) {
    const {
      filteredCountries,
      countries,
      loading,
      error,
      favoriteCountries
    } = useCountries();
  
    const renderLoadingState = () => (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '50vh',
          p: 4,
          boxSizing: 'border-box',
          backdropFilter: 'blur(5px)',
          background: 'rgba(2, 6, 23, 0.6)',
          borderRadius: 4,
          boxShadow: 'inset 0 0 30px rgba(125, 211, 252, 0.15)'
        }}
      >
        <CircularProgress size={80} sx={{ 
          color: 'primary.main',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
          filter: 'drop-shadow(0 0 10px rgba(125, 211, 252, 0.5))'
        }} />
        <Typography variant="h5" mt={3} sx={{ 
          color: 'white',
          fontWeight: 500,
          textShadow: '0 0 12px rgba(125, 211, 252, 0.7)'
        }}>
          Exploring the cosmos...
        </Typography>
      </Box>
    );
  
    const renderErrorState = () => (
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          p: 4,
          boxSizing: 'border-box',
          backdropFilter: 'blur(6px)',
          background: 'rgba(2, 6, 23, 0.7)',
          borderRadius: 4,
          boxShadow: 'inset 0 0 40px rgba(239, 68, 68, 0.15)'
        }}
      >
        <Alert 
          severity="error" 
          sx={{ 
            maxWidth: 500,
            width: '100%',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 2,
          }}
          action={
            <Button 
              color="error" 
              variant="contained"
              size="small"
              onClick={() => window.location.reload()}
              sx={{
                background: 'linear-gradient(45deg, #ef4444, #b91c1c)',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #dc2626, #991b1b)',
                },
              }}
            >
              Try Again
            </Button>
          }
        >
          <AlertTitle sx={{ fontWeight: 600 }}>Connection Error</AlertTitle>
          {error}
        </Alert>
      </Box>
    );
  
    const renderEmptyState = () => (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          py: 8,
          px: 4,
          backdropFilter: 'blur(6px)',
          background: 'rgba(2, 6, 23, 0.7)',
          borderRadius: 4,
          boxSizing: 'border-box',
          boxShadow: 'inset 0 0 40px rgba(125, 211, 252, 0.1)'
        }}
      >
        <GlobeIcon sx={{ 
          fontSize: 80, 
          color: alpha('#fff', 0.6), 
          mb: 3,
          filter: 'drop-shadow(0 0 15px rgba(125, 211, 252, 0.6))'
        }} />
        <Typography variant="h4" sx={{ 
          color: 'white',
          fontWeight: 600,
          textShadow: '0 0 12px rgba(125, 211, 252, 0.5)',
          mb: 2
        }}>
          No countries found
        </Typography>
        <Typography sx={{ 
          color: alpha('#fff', 0.8),
          fontSize: '1.1rem',
          textAlign: 'center',
          maxWidth: 500,
          textShadow: '0 1px 4px rgba(0,0,0,0.5)'
        }}>
          Your search didn't match any countries. Try adjusting your filters or search terms to explore more of our universe.
        </Typography>
      </Box>
    );
  
    const renderCountsBar = () => (
      <Box mb={3}>
        <Paper 
          elevation={4} 
          sx={{ 
            p: 2, 
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(to right, rgba(15, 23, 42, 0.8), rgba(2, 6, 23, 0.85))',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(148, 163, 184, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 8px rgba(125, 211, 252, 0.2)',
          }}
        >
          <Box display="flex" alignItems="center">
            <GlobeIcon sx={{ 
              color: 'primary.main', 
              mr: 1.5,
              fontSize: 28,
              filter: 'drop-shadow(0 0 5px rgba(125, 211, 252, 0.6))'
            }} />
            <Typography sx={{ 
              fontSize: '1.1rem',
              fontWeight: 500,
              color: alpha('#fff', 0.95),
              textShadow: '0 0 8px rgba(125, 211, 252, 0.3)'
            }}>
              Showing {filteredCountries.length} of {countries.length} countries
            </Typography>
          </Box>
          
          <Box 
            sx={{ 
              px: 2.5, 
              py: 0.75, 
              borderRadius: 6,
              background: 'linear-gradient(90deg, rgba(125, 211, 252, 0.2), rgba(196, 181, 253, 0.2))',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              boxShadow: '0 0 10px rgba(125, 211, 252, 0.15)'
            }}
          >
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 500, color: alpha('#fff', 0.95) }}>
              {countries.length} Countries • 7 Continents
            </Typography>
          </Box>
        </Paper>
      </Box>
    );
  
    return (
      <ThemeProvider theme={cosmicTheme}>
        {/* Contained Box with cosmic styling */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 3,
            overflow: 'hidden',
            my: 4,
            boxShadow: '0 16px 70px rgba(0, 0, 0, 0.7), 0 0 20px rgba(125, 211, 252, 0.15)'
          }}
        >
          {/* Star field background effect */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'400\' viewBox=\'0 0 800 800\'%3E%3Cg fill=\'none\' stroke=\'%23FFFFFF\' stroke-opacity=\'0.2\'%3E%3Ccircle r=\'1\' cx=\'100\' cy=\'100\'/%3E%3Ccircle r=\'1\' cx=\'200\' cy=\'150\'/%3E%3Ccircle r=\'1\' cx=\'300\' cy=\'200\'/%3E%3Ccircle r=\'1\' cx=\'400\' cy=\'250\'/%3E%3Ccircle r=\'1\' cx=\'500\' cy=\'300\'/%3E%3Ccircle r=\'1\' cx=\'600\' cy=\'350\'/%3E%3Ccircle r=\'1\' cx=\'700\' cy=\'400\'/%3E%3Ccircle r=\'1\' cx=\'100\' cy=\'450\'/%3E%3Ccircle r=\'1\' cx=\'200\' cy=\'500\'/%3E%3Ccircle r=\'1\' cx=\'300\' cy=\'550\'/%3E%3Ccircle r=\'1\' cx=\'400\' cy=\'600\'/%3E%3Ccircle r=\'1\' cx=\'500\' cy=\'650\'/%3E%3Ccircle r=\'1\' cx=\'600\' cy=\'700\'/%3E%3Ccircle r=\'1\' cx=\'700\' cy=\'750\'/%3E%3Ccircle r=\'1\' cx=\'150\' cy=\'125\'/%3E%3Ccircle r=\'1\' cx=\'250\' cy=\'175\'/%3E%3Ccircle r=\'1\' cx=\'350\' cy=\'225\'/%3E%3Ccircle r=\'1\' cx=\'450\' cy=\'275\'/%3E%3Ccircle r=\'1\' cx=\'550\' cy=\'325\'/%3E%3Ccircle r=\'1\' cx=\'650\' cy=\'375\'/%3E%3Ccircle r=\'1\' cx=\'750\' cy=\'425\'/%3E%3Ccircle r=\'1\' cx=\'150\' cy=\'475\'/%3E%3Ccircle r=\'1\' cx=\'250\' cy=\'525\'/%3E%3Ccircle r=\'1\' cx=\'350\' cy=\'575\'/%3E%3Ccircle r=\'1\' cx=\'450\' cy=\'625\'/%3E%3Ccircle r=\'1\' cx=\'550\' cy=\'675\'/%3E%3Ccircle r=\'1\' cx=\'650\' cy=\'725\'/%3E%3Ccircle r=\'1\' cx=\'750\' cy=\'775\'/%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to bottom, #020617, #0f172a)',
              backgroundSize: 'cover',
              zIndex: 0,
            }}
          />
  
          {/* Earth image with reduced blur */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundImage: `url(${earthImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.9,
              zIndex: 0,
            }}
          />
  
          {/* Cosmic overlay with subtle blur and glow */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: 'linear-gradient(135deg, rgba(2, 6, 23, 0.6), rgba(15, 23, 42, 0.7))',
              backdropFilter: 'blur(2px)',
              zIndex: 1,
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                background: 'radial-gradient(circle at center, transparent 0%, rgba(2, 6, 23, 0.7) 100%)',
                zIndex: 0,
              }
            }}
          />
  
          {/* Header section with cosmic title */}
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 4 }}>
            <Box textAlign="center" mb={6}>
              <Typography 
                variant="h2" 
                component="h1"
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  background: 'linear-gradient(90deg, #7dd3fc, #c4b5fd, #f0abfc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(125, 211, 252, 0.4)',
                  letterSpacing: '1px',
                }}
              >
                Cosmic Explorer
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  maxWidth: 700, 
                  mx: 'auto', 
                  color: alpha('#fff', 0.95),
                  textShadow: '0 0 12px rgba(125, 211, 252, 0.5)',
                  mb: 3,
                }}
              >
                Discover fascinating cultures across our celestial blue planet
              </Typography>
              <Box 
                sx={{ 
                  width: 120, 
                  height: 4, 
                  mx: 'auto', 
                  borderRadius: 4,
                  background: 'linear-gradient(90deg, #7dd3fc, #c4b5fd, #f0abfc)',
                  boxShadow: '0 0 15px rgba(125, 211, 252, 0.7)',
                }} 
              />
            </Box>
  
            {loading ? renderLoadingState() : error ? renderErrorState() : (
              <Container 
                maxWidth={false} 
                sx={{ 
                  maxWidth: 1240,
                  px: { xs: 2, sm: 3 },
                  py: 1,
                  boxSizing: 'border-box',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {/* Favorites section with cosmic styling */}
                {favoriteCountries.length > 0 && (
                  <Box mb={6}>
                    <Box 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        mb: 3,
                      }}
                    >
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 700, 
                          color: 'white',
                          textShadow: '0 0 12px rgba(125, 211, 252, 0.5)',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Box 
                          component="span" 
                          sx={{ 
                            mr: 1.5,
                            color: '#FBBF24',
                            fontSize: '1.3em',
                            filter: 'drop-shadow(0 0 5px rgba(251, 191, 36, 0.8))'
                          }}
                        >
                          ★
                        </Box>
                        Stellar Favorites
                      </Typography>
                    </Box>
                    
                    <Grid 
                      container 
                      spacing={3}
                      sx={{ 
                        alignItems: 'stretch',
                        '& > .MuiGrid-item': { 
                          display: 'flex',
                          alignItems: 'stretch'
                        }
                      }}
                    >
                      {favoriteCountries.map(country => (
                        <Grid 
                          item 
                          xs={12} 
                          sm={6} 
                          md={3}
                          key={country.cca3}
                          sx={{ 
                            display: 'flex',
                            minHeight: 380,
                            boxSizing: 'border-box',
                          }}
                        >
                          <CountryCard
                            country={country}
                            onClick={handleCountryClick}
                            view={view}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    
                    <Divider 
                      sx={{ 
                        my: 5,
                        borderColor: alpha('#c4b5fd', 0.2),
                        '&::before, &::after': {
                          borderColor: alpha('#c4b5fd', 0.2),
                        }
                      }} 
                    />
                  </Box>
                )}
  
                {renderCountsBar()}
  
                {filteredCountries.length > 0 ? (
                  <Grid 
                    container 
                    spacing={3}
                    sx={{ 
                      alignItems: 'stretch',
                      '& > .MuiGrid-item': { 
                        display: 'flex',
                        alignItems: 'stretch'
                      }
                    }}
                  >
                    {filteredCountries.map(country => (
                      <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        md={3}
                        key={country.cca3}
                        sx={{ 
                          display: 'flex',
                          minHeight: 380,
                          boxSizing: 'border-box',
                        }}
                      >
                        <CountryCard
                          country={country}
                          onClick={handleCountryClick}
                          view={view}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : renderEmptyState()}
              </Container>
            )}
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
  
  export default CountryList;