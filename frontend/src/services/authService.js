const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Registrar usuario
export const registerUser = async (userData) => {
  // Ajustado a /auth/register según la ruta del backend
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error al registrarse');
  return data;
};

// Iniciar sesión
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error al iniciar sesión');

  // Guardamos token y datos del usuario directamente en localStorage
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  if (data.user) {
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
};