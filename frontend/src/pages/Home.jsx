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
import Header from "../components/Header";
import Hero from "../components/Hero";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

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

    try {
      const result = await updateProduct(editingProduct._id, {
        name: editingProduct.name,
        description: editingProduct.description,
        price: Number(editingProduct.price),
        category: editingProduct.category,
        stock: Number(editingProduct.stock),
        image: editingProduct.image,
      });

      setProducts(
        products.map((product) =>
        product._id === result.data._id ? result.data : product
        )
      );

      setEditingProduct(null);
    } catch (error) {
      setError("No se han podido actualizar los cambios,");
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

      <ProductList
        products={products}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        handleUpdate={handleUpdate}
      />
      </main>
    </>
  );
}

export default Home;