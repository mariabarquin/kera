import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const result = await getProducts();
        setProducts(result.data);
      } catch (error) {
        setError("No se han podido cargar los productos.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Kera</h1>

      <h2>Productos</h2>

      {products.map((product) => (
        <article key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.category}</p>
          <p>{product.price} €</p>
          <p>Stock: {product.stock}</p>
        </article>
      ))}
    </main>
  );
}

export default Home;