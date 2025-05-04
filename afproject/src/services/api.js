// Base API URL
const BASE_URL = 'https://restcountries.com/v3.1';

// Common fields to include in requests to minimize payload size
const COMMON_FIELDS = 'name,capital,population,region,subregion,flags,languages,currencies,cca3,cca2,ccn3,borders';
const DETAIL_FIELDS = 'name,capital,population,region,subregion,flags,languages,currencies,cca3,cca2,ccn3,borders,area,maps,timezones,continents,coatOfArms,tld,idd,fifa,car,independent,unMember,landlocked,latlng';

// Helper function to make API requests
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

// Fetch all countries with limited fields
export const fetchAllCountries = async () => {
  return fetchData(`${BASE_URL}/all?fields=${COMMON_FIELDS}`);
};

// Search countries by name
export const searchCountries = async (name) => {
  return fetchData(`${BASE_URL}/name/${name}?fields=${COMMON_FIELDS}`);
};

// Fetch countries by region
export const fetchCountriesByRegion = async (region) => {
  return fetchData(`${BASE_URL}/region/${region}?fields=${COMMON_FIELDS}`);
};

// Fetch country by code
export const fetchCountryByCode = async (code) => {
  return fetchData(`${BASE_URL}/alpha/${code}?fields=${DETAIL_FIELDS}`);
};


// Fetch countries by language
export const fetchCountriesByLanguage = async (language) => {
  return fetchData(`${BASE_URL}/lang/${language}?fields=${COMMON_FIELDS}`);
};

// Fetch countries by currency
export const fetchCountriesByCurrency = async (currency) => {
  return fetchData(`${BASE_URL}/currency/${currency}?fields=${COMMON_FIELDS}`);
};

// Fetch countries by capital city
export const fetchCountriesByCapital = async (capital) => {
  return fetchData(`${BASE_URL}/capital/${capital}?fields=${COMMON_FIELDS}`);
};

// Fetch border countries
export const fetchBorderCountries = async (codes) => {
  if (!codes || codes.length === 0) return [];
  return fetchData(`${BASE_URL}/alpha?codes=${codes.join(',')}&fields=name,cca3,flags`);
};