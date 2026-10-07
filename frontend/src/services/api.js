// Acepta VITE_API_URL o VITE_API_BASE_URL; si contiene /api al final, la limpia para no duplicar.
const RAW_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const BASE_URL = RAW_URL.replace(/\/api\/?$/, '');

// Función auxiliar para recuperar el token de forma robusta
function getAuthToken() {
  let token = localStorage.getItem("token");

  if (!token) {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        token = user.token || user.jwt || user.accessToken || user.tokenJWT;
      } catch (e) {
        console.error("Error leyendo user de localStorage", e);
      }
    }
  }

  return token;
}

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/api/products`);

  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }

  return response.json();
}

export async function createProduct(product) {
  const token = getAuthToken();

  const response = await fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error al crear el producto");
  }

  return response.json();
}

export async function updateProduct(id, productData) {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No hay token de autenticación. Inicia sesión de nuevo.");
  }

  const response = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al actualizar el producto");
  }

  return data;
}

export async function deleteProduct(id) {
  const token = getAuthToken();

  const response = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el producto");
  }

  return response.json();
}