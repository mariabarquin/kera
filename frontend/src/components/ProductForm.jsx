function ProductForm({ form, handleChange, handleSubmit }) {
    return (
        <section>
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
                 type="text" 
                 name="stock"
                 placeholder="Stock"
                 value={form.stock}
                 onChange={handleChange}
                />

                <button type="submit">Añadir producto</button>
            </form>
        </section>
    );
}

export default ProductForm;