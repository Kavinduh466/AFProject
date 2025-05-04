import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    IconButton,
    Button,
    Chip,
    Stack,
    Grid,
    Paper,
    styled,
    SvgIcon,
    useTheme,
  } from '@mui/material';
  import { Favorite, FavoriteBorder, Map as MapIcon, Public, Language, AccessTime, Directions, LocalAirport } from '@mui/icons-material';
  import { useCountries } from '../contexts/CountryContext';
  import { useState, useEffect } from 'react';
  
  // Create custom styled components with space/stars and rose dark theme
  const StyledCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    maxWidth: 800,
    borderRadius: 16,
    overflow: 'visible',
    background: 'linear-gradient(135deg, #1e1e2f 0%, #2d2b42 100%)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 16,
      padding: 2,
      background: 'linear-gradient(135deg, #e91e63 0%, #5e35b1 100%)',
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      zIndex: -1,
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      top: -50,
      left: -50,
      right: -50,
      bottom: -50,
      background: 'radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 6px)',
      backgroundSize: '50px 50px',
      opacity: 0.1,
      zIndex: -2,
      pointerEvents: 'none',
    },
  }));
  
  const StyledChip = styled(Chip)(({ theme, color }) => ({
    backgroundColor:
      color === 'success' ? 'rgba(46, 125, 50, 0.15)' : color === 'error' ? 'rgba(233, 30, 99, 0.15)' : 'rgba(94, 53, 177, 0.15)',
    color: color === 'success' ? '#2ecc71' : color === 'error' ? '#e91e63' : '#5e35b1',
    border: `1px solid ${color === 'success' ? '#2ecc71' : color === 'error' ? '#e91e63' : '#5e35b1'}`,
    fontWeight: 600,
    '&:hover': {
      backgroundColor:
        color === 'success' ? 'rgba(46, 125, 50, 0.25)' : color === 'error' ? 'rgba(233, 30, 99, 0.25)' : 'rgba(94, 53, 177, 0.25)',
    },
  }));
  
  const InfoBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 16,
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    },
  }));
  
  const StyledButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #e91e63 30%, #5e35b1 90%)',
    border: 0,
    borderRadius: 50,
    boxShadow: '0 3px 5px 2px rgba(233, 30, 99, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
      background: 'linear-gradient(45deg, #d81b60 30%, #512da8 90%)',
      boxShadow: '0 5px 10px 2px rgba(233, 30, 99, .5)',
    },
  }));
  
  const GlowingText = styled(Typography)(({ theme }) => ({
    color: '#fff',
    textShadow: '0 0 10px rgba(233, 30, 99, 0.5)',
    fontWeight: 700,
  }));
  
  function CountryDetail({ country, handleBackClick, isLoggedIn, onCountrySelect }) {
    const { toggleFavorite, isFavorite, countries } = useCountries();
    const favorite = isFavorite(country);
    const theme = useTheme();
  
    // Function to handle clicking on a border country
    const handleCountryClick = (borderCountry) => {
      if (onCountrySelect) {
        onCountrySelect(borderCountry);
      }
    };
  
    // Animated stars effect for background
    const [stars, setStars] = useState([]);
  
    useEffect(() => {
      const generateStars = () => {
        const newStars = [];
        for (let i = 0; i < 100; i++) {
          newStars.push({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: `${Math.random() * 2 + 1}px`,
            animationDuration: `${Math.random() * 5 + 2}s`,
          });
        }
        setStars(newStars);
      };
  
      generateStars();
    }, []);
  
    const borderCountries = country.borders
      ? country.borders.map((code) => countries.find((c) => c.cca3 === code)).filter(Boolean)
      : [];
  
    // Format number with commas
    const formatNumber = (num) => {
      return num ? num.toLocaleString() : 'N/A';
    };
  
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #121212 0%, #212121 100%)',
          p: { xs: 2, sm: 4 },
          gap: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated stars background */}
        {stars.map((star) => (
          <Box
            key={star.id}
            sx={{
              position: 'absolute',
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              backgroundColor: '#fff',
              borderRadius: '50%',
              opacity: Math.random(),
              animation: `twinkle ${star.animationDuration} infinite`,
              '@keyframes twinkle': {
                '0%': { opacity: 0.2 },
                '50%': { opacity: 0.8 },
                '100%': { opacity: 0.2 },
              },
            }}
          />
        ))}
  
        <StyledCard>
          <CardMedia
            component="img"
            image={country.flags?.svg || country.flags?.png || 'placeholder.png'}
            alt={`Flag of ${country.name.common}`}
            sx={{
              width: '100%',
              height: 240,
              objectFit: 'contain',
              bgcolor: 'rgba(0,0,0,0.5)',
              p: 2,
              borderBottom: '2px solid',
              borderImage: 'linear-gradient(90deg, #e91e63, #5e35b1) 1',
            }}
          />
          <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3, color: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <GlowingText variant="h3" fontWeight="bold">
                {country.name.common}
              </GlowingText>
              {isLoggedIn && (
                <IconButton
                  onClick={() => toggleFavorite(country)}
                  sx={{
                    color: favorite ? '#e91e63' : 'white',
                    '&:hover': { color: '#e91e63' },
                  }}
                >
                  {favorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              )}
            </Box>
  
            {country.name.official !== country.name.common && (
              <Typography variant="subtitle1" color="rgba(255,255,255,0.7)" sx={{ fontStyle: 'italic' }}>
                {country.name.official}
              </Typography>
            )}
  
            {/* Coat of Arms */}
            {country.coatOfArms?.svg && (
              <InfoBox>
                <Typography variant="h6" color="#e91e63" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SvgIcon sx={{ color: '#e91e63', fontSize: 20 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 nearly 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm-1.902 3.976a.75.75 0 011.06-.025l2.5 2.25a.75.75 0 010 1.085l-2.5 2.25a.75.75 0 01-1.035-.085.75.75 0 01-.025-1.06L11.648 9l-1.5-1.35a.75.75 0 01.025-1.06zm3.804 0a.75.75 0 00-1.06-.025l-2.5 2.25a.75.75 0 000 1.085l2.5 2.25a.75.75 0 001.035-.085.75.75 0 00.025-1.06L12.352 9l1.5-1.35a.75.75 0 00-.025-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </SvgIcon>
                  Coat of Arms
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <img
                    src={country.coatOfArms.svg}
                    alt={`Coat of arms of ${country.name.common}`}
                    style={{ height: '120px', width: 'auto' }}
                  />
                </Box>
              </InfoBox>
            )}
  
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <InfoBox>
                  <Typography variant="h6" color="#e91e63" gutterBottom>
                    General Information
                  </Typography>
                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Public sx={{ color: '#e91e63', fontSize: 20 }} />
                      <Typography>
                        <strong>Region:</strong> {country.region}
                        {country.subregion ? ` (${country.subregion})` : ''}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SvgIcon sx={{ color: '#e91e63', fontSize: 20 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 22c6.627 0 12-5.373 12-12S18.627 -2 12 -2 0 3.373 0 10s5.373 12 12 12z" />
                          <path
                            fillRule="evenodd"
                            d="M12 1.5c-5.799 0-10.5 4.701-10.5 10.5S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5zM8.5 9a.5.5 0 01.5.5v4a.5.5 0 01-1 0v-4a.5.5 0 01.5-.5zm4 0a.5.5 0 01.5.5v4a.5.5 0 01-1 0v-4a.5.5 0 01.5-.5zm4 0a.5.5 0 01.5.5v4a.5.5 0 01-1 0v-4a.5.5 0 01.5-.5z"
                          />
                        </svg>
                      </SvgIcon>
                      <Typography>
                        <strong>Population:</strong> {formatNumber(country.population)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SvgIcon sx={{ color: '#e91e63', fontSize: 20 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </SvgIcon>
                      <Typography>
                        <strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}
                      </Typography>
                    </Box>
                    {country.area && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SvgIcon sx={{ color: '#e91e63', fontSize: 20 }}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </SvgIcon>
                        <Typography>
                          <strong>Area:</strong> {formatNumber(country.area)} km²
                        </Typography>
                      </Box>
                    )}
                    {country.tld && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SvgIcon sx={{ color: '#e91e63', fontSize: 20 }}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M11.097 1.515a.75.75 0 01.589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 111.47.294L16.665 7.5h3.585a.75.75 0 010 1.5h-3.885l-1.2 6h3.585a.75.75 0 010 1.5h-3.885l-1.08 5.397a.75.75 0 11-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 01-1.47-.294l1.02-5.103H3.75a.75.75 0 010-1.5h3.885l1.2-6H5.25a.75.75 0 010-1.5h3.885l1.08-5.397a.75.75 0 01.882-.588zM10.365 9l-1.2 6h4.47l1.2-6h-4.47z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </SvgIcon>
                        <Typography>
                          <strong>Top Level Domain:</strong> {country.tld.join(', ')}
                        </Typography>
                      </Box>
                    )}
                    {country.currencies && Object.keys(country.currencies).length > 0 && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SvgIcon sx={{ color: '#e91e63', fontSize: 20 }}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 2.534 2.534 0 01-.921.42z" />
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.2zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a3.833 3.833 0 001.719-.756c.712-.566 1.112-1.35 1.112-2.178 0-.829-.4-1.612-1.113-2.178a3.833 3.833 0 00-1.718-.756V8.334c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </SvgIcon>
                        <Typography>
                          <strong>Currencies:</strong>{' '}
                          {Object.entries(country.currencies)
                            .map(([code, currency]) => `${currency.name} (${currency.symbol || code})`)
                            .join(', ')}
                        </Typography>
                      </Box>
                    )}
                    {country.languages && Object.keys(country.languages).length > 0 && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Language sx={{ color: '#e92e63', fontSize: 20 }} />
                        <Typography>
                          <strong>Languages:</strong> {Object.values(country.languages).join(', ')}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </InfoBox>
              </Grid>
  
              <Grid item xs={12} sm={6}>
                <InfoBox>
                  <Typography variant="h6" color="#e91e63" gutterBottom>
                    Status Information
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <StyledChip
                        label={`UN Member: ${country.unMember ? 'Yes' : 'No'}`}
                        color={country.unMember ? 'success' : 'error'}
                        size="medium"
                      />
                      <StyledChip
                        label={`Independent: ${country.independent ? 'Yes' : 'No'}`}
                        color={country.independent ? 'success' : 'error'}
                        size="medium"
                      />
                    </Box>
                    {country.car?.side && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Directions sx={{ color: '#e91e63', fontSize: 20 }} />
                        <Typography>
                          <strong>Driving Side:</strong>{' '}
                          {country.car.side.charAt(0).toUpperCase() + country.car.side.slice(1)}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </InfoBox>
              </Grid>
  
              {/* Time Zones */}
              {country.timezones && country.timezones.length > 0 && (
                <Grid item xs={12}>
                  <InfoBox>
                    <Typography variant="h6" color="#e91e63" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTime sx={{ color: '#e91e63' }} />
                      Time Zones
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} mt={1}>
                      {country.timezones.map((timezone, index) => (
                        <StyledChip key={index} label={timezone} size="small" />
                      ))}
                    </Stack>
                  </InfoBox>
                </Grid>
              )}
  
              {/* Border Countries */}
              {borderCountries.length > 0 && (
                <Grid item xs={12}>
                  <InfoBox>
                    <Typography variant="h6" color="#e91e63" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalAirport sx={{ color: '#e91e63' }} />
                      Border Countries
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} mt={1}>
                      {borderCountries.map((border) => (
                        <StyledChip
                          key={border.cca3}
                          label={border.name.common}
                          clickable
                          onClick={() => handleCountryClick(border)}
                        />
                      ))}
                    </Stack>
                  </InfoBox>
                </Grid>
              )}
            </Grid>
  
            {/* Maps */}
            {(country.maps?.googleMaps || country.maps?.openStreetMaps) && (
              <Box mt={2}>
                <GlowingText variant="h6" gutterBottom>
                  Maps
                </GlowingText>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  {country.maps?.googleMaps && (
                    <StyledButton
                      startIcon={<MapIcon />}
                      href={country.maps.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                    >
                      View on Google Maps
                    </StyledButton>
                  )}
                  {country.maps?.openStreetMaps && (
                    <StyledButton
                      startIcon={<MapIcon />}
                      href={country.maps.openStreetMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                      sx={{
                        background: 'linear-gradient(45deg, #5e35b1 30%, #e91e63 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #512da8 30%, #d81b60 90%)',
                        },
                      }}
                    >
                      View on OpenStreetMap
                    </StyledButton>
                  )}
                </Stack>
              </Box>
            )}
          </CardContent>
        </StyledCard>
  
        <StyledButton
          onClick={handleBackClick}
          sx={{
            mt: 3,
            minWidth: 200,
            background: 'linear-gradient(45deg, #5e35b1 30%, #e91e63 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #512da8 30%, #d81b60 90%)',
            },
          }}
        >
          Back to Countries
        </StyledButton>
      </Box>
    );
  }
  
  export default CountryDetail;