// Acepta VITE_API_URL o VITE_API_BASE_URL; si contiene /api al final, la limpia para no duplicar.
const RAW_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const BASE_URL = RAW_URL.replace(/\/api\/?$/, '');

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/api/products`);

  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }

  return response.json();
}

export async function createProduct(product) {
  const response = await fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error al crear el producto");
  }

  return response.json();
}

export async function updateProduct(id, product) {
  const response = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el producto");
  }

  return response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el producto");
  }

  return response.json();
}