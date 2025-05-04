// Simple authentication service using localStorage
// In a real application, this would connect to a backend API

// Store user in localStorage
export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  // Get user from localStorage
  export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  // Remove user from localStorage
  export const removeUser = () => {
    localStorage.removeItem('user');
  };
  
  // Check if user is logged in
  export const isAuthenticated = () => {
    return !!getUser();
  };
  
  // Login user (mock implementation)
  export const login = (email, password) => {
    // In a real app, this would make an API call to authenticate the user
    // For demo purposes, we'll just create a mock user
    const user = {
      id: 1,
      name: 'Demo User',
      email: email || 'user@example.com'
    };
    
    setUser(user);
    return user;
  };
  
  // Logout user
  export const logout = () => {
    removeUser();
  };
  
  // Register user (mock implementation)
  export const register = (name, email, password) => {
    // In a real app, this would make an API call to register the user
    // For demo purposes, we'll just create a mock user
    const user = {
      id: Date.now(),
      name,
      email
    };
    
    setUser(user);
    return user;
  };
  
  // Save user favorites
  export const saveFavorites = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
  
  // Get user favorites
  export const getFavorites = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  };
  
  // Add country to favorites
  export const addToFavorites = (country) => {
    const favorites = getFavorites();
    const updatedFavorites = [...favorites, country];
    saveFavorites(updatedFavorites);
    return updatedFavorites;
  };
  
  // Remove country from favorites
  export const removeFromFavorites = (countryCode) => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(country => country.cca3 !== countryCode);
    saveFavorites(updatedFavorites);
    return updatedFavorites;
  };