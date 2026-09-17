function ProductForm({ form, handleChange, handleSubmit }) {
    return (
        <section className="product-form-section">
             <div className="section-heading">
              <p>NEW FORMULA</p>
              <h2>Add a product</h2>
            </div>

        <form className="product-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Product name"
                value={form.name}
                onChange={handleChange}
            />

            <input
                type="text"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
            />

            <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
            />

            <input
                type="text"
                name="category"
                placeholder="Category"
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

            <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
            />

         <button type="submit">ADD PRODUCT</button>
        </form>
        </section>
    );
}

export default ProductForm;