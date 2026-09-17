function ProductList({ products }) {
    return (
        <section>
            <h2>Productos</h2>

            {products.map((product) => (
                <article key={product._id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product.category}</p>
                    <p>{product.price}</p>
                    <p>Stock: {product.stock}</p>
                </article>
            ))}
        </section>
    );
}

export default ProductList;