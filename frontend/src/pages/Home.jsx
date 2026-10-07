import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../services/api";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import "../styles/kera.css";
import Hero from "../components/Hero";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  // Comprobación de Rol para ocultar/mostrar controles CUD
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const isAdmin = user && user.role === "admin";

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

      setProducts([...products, result.data || result]);

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

  async function handleDelete(id) {
    try {
      await deleteProduct(id);

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      setError("No se ha podido eliminar el producto.");
    }
  }

  function handleEdit(id) {
    const product = products.find((product) => product._id === id);
    setEditingProduct(product);
  }

  async function handleUpdate(event) {
  event.preventDefault();
  setError("");

  try {
    console.log("Enviando actualización de:", editingProduct);

    const result = await updateProduct(editingProduct._id, {
      name: editingProduct.name,
      description: editingProduct.description,
      price: Number(editingProduct.price),
      category: editingProduct.category,
      stock: Number(editingProduct.stock),
      image: editingProduct.image,
    });

    console.log("Respuesta del servidor:", result);

    const updated = result.data || result;

    setProducts((prev) =>
      prev.map((p) => (p._id === editingProduct._id ? updated : p))
    );

    setEditingProduct(null);
  } catch (err) {
    console.error("Error capturado en handleUpdate:", err);
    alert(`Error al guardar: ${err.message}`);
  }
}

  useEffect(() => {
    async function loadProducts() {
      try {
        const result = await getProducts();
        setProducts(result.data || result);
      } catch (error) {
        setError("No se han podido cargar los productos.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", padding: "2rem" }}>Cargando productos...</p>;
  }

  return (
    <>
      <Hero />

      <main>
        {error && (
          <p className="auth-error" style={{ textAlign: "center", margin: "1rem 0" }}>
            {error}
          </p>
        )}

        {/* 1. Solo muestra ProductForm si es ADMIN */}
        {isAdmin && (
          <ProductForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}

        {/* 2. Pasa handleDelete y handleEdit ÚNICAMENTE si es ADMIN */}
        <ProductList
          products={products}
          handleDelete={isAdmin ? handleDelete : null}
          handleEdit={isAdmin ? handleEdit : null}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          handleUpdate={handleUpdate}
        />
      </main>
    </>
  );
}

export default Home;