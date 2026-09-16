import { useEffect, useState } from "react";
import { getProducts, createProduct } from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const result = await createProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });

      setProducts([...products, result.data]);

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });
    } catch (error) {
      setError("No se ha podido crear el producto");
    }
  }

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

      <h2>Añadir producto</h2>

      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />

         <input 
          type="text"
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange} 
        />

          <input 
            type="number"
            name="price"
            placeholder="Precio"
            value={form.price}
            onChange={handleChange}
         />

          <input 
            type="text"
            name="category"
            placeholder="Categoría"
            value={form.category}
            onChange={handleChange}
          />

          <input 
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
          />

          <button type="submit">Añadir producto</button>
      </form>

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