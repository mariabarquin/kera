function ProductList({
  products,
  handleDelete,
  handleEdit,
  editingProduct,
  setEditingProduct,
  handleUpdate,
}) {
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

                <button onClick={() => handleEdit(product._id)}>
                  EDIT
                </button>

                <button onClick={() => handleDelete(product._id)}>
                  DELETE
                </button>
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