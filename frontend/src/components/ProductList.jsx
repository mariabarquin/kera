function ProductList({ products }) {
  return (
    <section className="products-section" id="products">
      <div className="section-heading">
        <p>OUR PRODUCTS</p>
        <h2>Explore our formulas</h2>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <article className="product-card" key={product._id}>
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
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductList;