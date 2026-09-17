import { useEffect, useState } from "react";
import { getProducts, createProduct } from "../services/api";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import "../styles/kera.css";
import Header from "../components/Header";
import Hero from "../components/Hero";

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
    image: "",
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
        image: "",
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
    <>
      <Header />

      <Hero />

      <main>
      <ProductForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <ProductList products={products} />
      </main>
    </>
  );
}

export default Home;