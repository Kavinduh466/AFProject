import { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Button,
  Paper,
  Collapse,
  InputLabel,
  FormControl,
  Badge
} from '@mui/material';
import {
  Search,
  ViewModule,
  ViewList,
  FilterList,
  Close,
  ExpandMore
} from '@mui/icons-material';
import { useCountries } from '../contexts/CountryContext';

function FilterBar({ view, setView }) {
  const {
    searchTerm,
    setSearchTerm,
    regionFilter,
    setRegionFilter,
    languageFilter,
    setLanguageFilter,
    regions,
    commonLanguages
  } = useCountries();

  const [showFilters, setShowFilters] = useState(false);

  const handleClearAll = () => {
    setSearchTerm('');
    setRegionFilter('');
    setLanguageFilter('');
  };

  const activeFilters = (regionFilter ? 1 : 0) + (languageFilter ? 1 : 0);

  return (
    <Paper
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        mt: 4,
        p: 3,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #0f172a, #1e3a8a, #9333ea)',
        color: '#f8fafc',
        position: 'relative',
        overflow: 'hidden'
      }}
      elevation={4}
    >
      {/* Starry Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 0,
          backgroundImage:
            'radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px',
          opacity: 0.04,
          animation: 'moveStars 60s linear infinite',
          '@keyframes moveStars': {
            from: { backgroundPosition: '0 0, 15px 15px' },
            to: { backgroundPosition: '1000px 1000px, 1015px 1015px' }
          }
        }}
      />

      {/* Top Bar */}
      <Grid container spacing={2} alignItems="center" sx={{ zIndex: 1, position: 'relative' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Search for a country"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              input: { color: '#f1f5f9' },
              label: { color: '#cbd5e1' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#64748b' },
                '&:hover fieldset': { borderColor: '#93c5fd' },
              }
            }}
            InputProps={{
              startAdornment: <Search fontSize="small" sx={{ mr: 1, color: '#60a5fa' }} />,
              endAdornment: searchTerm && (
                <IconButton size="small" onClick={() => setSearchTerm('')} sx={{ color: '#f87171' }}>
                  <Close fontSize="small" />
                </IconButton>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button
              variant={showFilters ? 'contained' : 'outlined'}
              sx={{
                color: '#f8fafc',
                borderColor: '#60a5fa',
                backgroundColor: showFilters ? '#2563eb' : 'transparent',
                '&:hover': {
                  backgroundColor: '#1d4ed8',
                  borderColor: '#3b82f6'
                }
              }}
              startIcon={
                <Badge badgeContent={activeFilters} color="secondary">
                  <FilterList />
                </Badge>
              }
              endIcon={
                <ExpandMore
                  sx={{
                    transform: showFilters ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: '0.3s',
                    color: '#f8fafc'
                  }}
                />
              }
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>

            <IconButton
              color={view === 'grid' ? 'primary' : 'default'}
              onClick={() => setView('grid')}
              sx={{ color: view === 'grid' ? '#3b82f6' : '#cbd5e1' }}
            >
              <ViewModule />
            </IconButton>
            <IconButton
              color={view === 'list' ? 'primary' : 'default'}
              onClick={() => setView('list')}
              sx={{ color: view === 'list' ? '#3b82f6' : '#cbd5e1' }}
            >
              <ViewList />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Filters */}
      <Collapse in={showFilters}>
        <Box mt={3} sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="region-label" sx={{ color: '#cbd5e1' }}>
                  Region
                </InputLabel>
                <Select
                  labelId="region-label"
                  value={regionFilter}
                  label="Region"
                  onChange={(e) => setRegionFilter(e.target.value)}
                  sx={{
                    color: '#f1f5f9',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#64748b'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#93c5fd'
                    }
                  }}
                >
                  <MenuItem value="">All Regions</MenuItem>
                  {regions.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="language-label" sx={{ color: '#cbd5e1' }}>
                  Language
                </InputLabel>
                <Select
                  labelId="language-label"
                  value={languageFilter}
                  label="Language"
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  sx={{
                    color: '#f1f5f9',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#64748b'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#93c5fd'
                    }
                  }}
                >
                  <MenuItem value="">All Languages</MenuItem>
                  {commonLanguages.map((language) => (
                    <MenuItem key={language} value={language}>
                      {language}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                disabled={!searchTerm && !regionFilter && !languageFilter}
                onClick={handleClearAll}
              >
                Clear All Filters
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Paper>
  );
}

export default FilterBar;
