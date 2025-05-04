import { 
    Card, 
    CardMedia, 
    CardContent, 
    Typography, 
    Box, 
    IconButton,
    CardActionArea
  } from '@mui/material';
  import { Favorite, FavoriteBorder } from '@mui/icons-material';
  import { useCountries } from '../contexts/CountryContext';
  import { useAuth } from '../contexts/AuthContext';
  import { formatPopulation } from '../utils/formatter';
  
  function CountryCard({ country, onClick, view }) {
    const { toggleFavorite, isFavorite } = useCountries();
    const { isLoggedIn } = useAuth();
    
    const favorite = isFavorite(country);
  
    return (
      <Card 
        elevation={3} 
        sx={{ 
          // CONCERN: Fixed size for identical grids in 4-per-row layout
          width: 280,
          height: 360,
          display: view === 'list' ? 'flex' : 'block',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
          },
          borderRadius: 2,
          overflow: 'hidden',
          boxSizing: 'border-box',
          // CONCERN: Ensure alignment by resetting margins
          margin: 0
        }}
      >
        <CardActionArea 
          onClick={() => onClick(country)}
          sx={{ 
            display: 'flex', 
            flexDirection: view === 'list' ? 'row' : 'column',
            height: '100%',
            alignItems: 'stretch',
            width: '100%'
          }}
        >
          <CardMedia
            component="img"
            image={country.flags.svg || country.flags.png}
            alt={`Flag of ${country.name.common}`}
            sx={{ 
              // CONCERN: Uniform image size for consistent grid appearance
              width: view === 'list' ? 160 : '100%',
              height: view === 'list' ? 160 : 160,
              objectFit: 'contain',
              bgcolor: 'grey.100',
              boxSizing: 'border-box'
            }}
          />
  
          <CardContent 
            sx={{ 
              flex: 1, 
              position: 'relative', 
              p: 1.5,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.paper',
              boxSizing: 'border-box'
            }}
          >
            <Box sx={{ 
              position: 'absolute', 
              top: 6, 
              right: 6, 
              zIndex: 10, 
              bgcolor: 'rgba(255,255,255,0.9)', 
              borderRadius: '50%' 
            }}>
              {isLoggedIn && (
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(country);
                  }}
                  sx={{ color: favorite ? 'error.main' : 'text.secondary' }}
                >
                  {favorite ? 
                    <Favorite fontSize="small" /> : 
                    <FavoriteBorder fontSize="small" />
                  }
                </IconButton>
              )}
            </Box>
  
            <Typography 
              variant="h6" 
              component="h3" 
              noWrap 
              fontWeight="bold"
              sx={{ 
                mb: 1,
                pr: 4,
                color: 'text.primary',
                fontSize: '1rem'
              }}
            >
              {country.name.common}
            </Typography>
  
            <Box sx={{ mt: 0.5, color: 'text.secondary', fontSize: '0.8rem' }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Pop:</strong> {formatPopulation(country.population)}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Region:</strong> {country.region}
              </Typography>
              <Typography variant="body2">
                <strong>Capital:</strong> {country.capital ? country.capital.join(', ') : 'N/A'}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
  
  export default CountryCard;