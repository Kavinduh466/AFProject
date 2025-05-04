import { useState, useEffect } from 'react';
import { fetchCountries } from '../services/api';

export default function useCountries() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');

  // Fetch countries on mount
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchCountries();
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  // Filter countries based on search term, region, and language
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

  return {
    countries,
    filteredCountries,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    regionFilter,
    setRegionFilter,
    languageFilter,
    setLanguageFilter
  };
}