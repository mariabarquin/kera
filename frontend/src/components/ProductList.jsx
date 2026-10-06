import { useNavigate } from "react-router-dom";

function ProductList({
  products,
  handleDelete,
  handleEdit,
  editingProduct,
  setEditingProduct,
  handleUpdate,
}) {
  const navigate = useNavigate();

  // Gestión de la acción "Añadir al Carrito"
  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      // Si no hay sesión iniciada, redirige al login con el mensaje contextual
      navigate("/login", {
        state: {
          from: "/",
          message: "Para añadir este producto al carrito e iniciar tu pedido, por favor accede a tu cuenta.",
        },
      });
      return;
    }

    // Si el usuario está autenticado, procesa la adición al carrito
    console.log("Producto añadido al carrito:", product);
  };

  return (
    <section className="products-section" id="products">
      <div className="section-heading">
        <p>OUR PRODUCTS</p>
        <h2>Explore our formulas</h2>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <article className="product-card" key={product._id}>
            {editingProduct?._id === product._id ? (
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(event) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: event.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  value={editingProduct.description}
                  onChange={(event) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: event.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(event) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: event.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  value={editingProduct.category}
                  onChange={(event) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: event.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(event) =>
                    setEditingProduct({
                      ...editingProduct,
                      stock: event.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  value={editingProduct.image || ""}
                  onChange={(event) =>
                    setEditingProduct({
                      ...editingProduct,
                      image: event.target.value,
                    })
                  }
                />

                <button type="submit">SAVE</button>

                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                >
                  CANCEL
                </button>
              </form>
            ) : (
              <div>
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <span>KERA</span>
                  )}
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">{product.price} €</p>

                  {/* Botón común para todos los usuarios/visitantes */}
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="add-to-cart-btn"
                  >
                    ADD TO CART
                  </button>

                  {/* Opciones CUD protegidas: solo se muestran si el usuario es Admin */}
                  {handleEdit && handleDelete && (
                    <div className="admin-actions" style={{ marginTop: "0.5rem" }}>
                      <button onClick={() => handleEdit(product._id)}>
                        EDIT
                      </button>

                      <button onClick={() => handleDelete(product._id)}>
                        DELETE
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductList;