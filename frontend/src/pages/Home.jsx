import { useEffect, useState } from "react";
import { getProducts, createProduct } from "../services/api";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

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

    <ProductForm
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />

      <ProductList products={products} />
    </main>
  );
}

export default Home;