const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts() {
  const response = await fetch(`${API_URL}/api/products`);

  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }

  return response.json();
}

export async function createProduct(product) {
  const response = await fetch(`${API_URL}/api/products`, {
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