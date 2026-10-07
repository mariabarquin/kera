const RAW_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:3000';

const BASE_URL = RAW_URL.replace(/\/api\/?$/, '');

const getAuthToken = () => {
  return localStorage.getItem('token');
};

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/api/products`);

  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }

  return response.json();
}

export async function createProduct(product) {
  const token = getAuthToken();

  if (!token) {
    throw new Error('No hay token de autenticación. Inicia sesión de nuevo.');
  }

  const response = await fetch(`${BASE_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(product)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al crear el producto');
  }

  return data;
}

export async function updateProduct(id, productData) {
  const token = getAuthToken();

  if (!token) {
    throw new Error('No hay token de autenticación. Inicia sesión de nuevo.');
  }

  const response = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al actualizar el producto');
  }

  return data;
}

export async function deleteProduct(id) {
  const token = getAuthToken();

  if (!token) {
    throw new Error('No hay token de autenticación. Inicia sesión de nuevo.');
  }

  const response = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al eliminar el producto');
  }

  return data;
}
