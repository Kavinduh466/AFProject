import { createContext, useState, useContext, useEffect } from 'react';
import { fetchAllCountries, searchCountries, fetchCountriesByRegion } from '../services/api';

const CountryContext = createContext();

export function CountryProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  
  // Regions for the dropdown
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
  // List of common languages for the dropdown
  const commonLanguages = ['English', 'Spanish', 'French', 'Arabic', 'Chinese', 'Russian', 'Portuguese', 'German'];
  
  // Fetch all countries on component mount
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    loadCountries();
    
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavoriteCountries(JSON.parse(storedFavorites));
    }
  }, []);
  
  // Filter countries based on search term, region and language
  useEffect(() => {
    let result = countries;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (country.name.official && country.name.official.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by region
    if (regionFilter) {
      result = result.filter(country => country.region === regionFilter);
    }
    
    // Filter by language
    if (languageFilter && languageFilter !== '') {
      result = result.filter(country => {
        if (country.languages) {
          return Object.values(country.languages).some(
            lang => lang.toLowerCase().includes(languageFilter.toLowerCase())
          );
        }
        return false;
      });
    }
    
    setFilteredCountries(result);
  }, [searchTerm, regionFilter, languageFilter, countries]);
  
  // Toggle favorite
  const toggleFavorite = (country) => {
    if (favoriteCountries.some(fav => fav.cca3 === country.cca3)) {
      const newFavorites = favoriteCountries.filter(fav => fav.cca3 !== country.cca3);
      setFavoriteCountries(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      const newFavorites = [...favoriteCountries, country];
      setFavoriteCountries(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };
  
  // Check if a country is in favorites
  const isFavorite = (country) => {
    return favoriteCountries.some(fav => fav.cca3 === country.cca3);
  };
  
  const value = {
    countries,
    filteredCountries,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    regionFilter,
    setRegionFilter,
    languageFilter,
    setLanguageFilter,
    regions,
    commonLanguages,
    favoriteCountries,
    toggleFavorite,
    isFavorite
  };

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountries() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountries must be used within a CountryProvider');
  }
  return context;
}

export default CountryContext;