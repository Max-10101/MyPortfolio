import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const verifyAuth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/verify`, {
      withCredentials: true
    });
    return response.data.valid;
  } catch {
    return false;
  }
};

export const login = async (username: string, password: string): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      username,
      password
    }, {
      withCredentials: true
    });
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axios.post(`${API_URL}/api/auth/logout`, {}, {
      withCredentials: true
    });
    // Rediriger vers la page d'accueil après la déconnexion
    window.location.href = '/';
  } catch (error) {
    console.error('Logout error:', error);
    // En cas d'erreur, on redirige quand même vers la page d'accueil
    window.location.href = '/';
    throw error;
  }
};

export const handleBeforeUnload = () => {
  // Utiliser une requête synchrone pour s'assurer que la déconnexion est effectuée
  // avant la fermeture de la page
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${API_URL}/api/auth/logout`, false);
  xhr.withCredentials = true;
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  try {
    xhr.send();
    // Supprimer le cookie d'authentification
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  } catch (error) {
    console.error('Error during auto-logout:', error);
  }
};
