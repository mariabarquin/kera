import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock <= 10
  );

  const productsByCategory = products.reduce((categories, product) => {
    categories[product.category] = (categories[product.category] || 0) + 1;
    return categories;
  }, {});

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Resumen general de KERA</p>
      </div>

      <section className="dashboard-metrics">
        <article className="metric-card">
          <span className="metric-value">12</span>
          <span className="metric-label">Pedidos activos</span>
        </article>

        <article className="metric-card">
          <span className="metric-value">{products.length}</span>
          <span className="metric-label">Productos</span>
        </article>

        <article className="metric-card">
          <span className="metric-value">{lowStockProducts.length}</span>
          <span className="metric-label">Stock bajo</span>
        </article>

        <article className="metric-card">
          <span className="metric-value">1.284 €</span>
          <span className="metric-label">Ventas</span>
        </article>
      </section>

      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Pedidos activos</h2>
            <p>Últimos pedidos realizados en KERA</p>
          </div>
        </div>

        <div className="orders-table">
          <div className="order-row order-header">
            <span>Pedido</span>
            <span>Cliente</span>
            <span>Productos</span>
            <span>Total</span>
            <span>Estado</span>
          </div>

          <div className="order-row">
            <span>#KERA-1024</span>
            <span>Laura Martín</span>
            <span>2 productos</span>
            <span>48,00 €</span>
            <span className="status status-processing">En preparación</span>
          </div>

          <div className="order-row">
            <span>#KERA-1023</span>
            <span>Clara López</span>
            <span>3 productos</span>
            <span>72,50 €</span>
            <span className="status status-shipping">Enviado</span>
          </div>

          <div className="order-row">
            <span>#KERA-1022</span>
            <span>María García</span>
            <span>1 producto</span>
            <span>24,00 €</span>
            <span className="status status-processing">En preparación</span>
          </div>

          <div className="order-row">
            <span>#KERA-1021</span>
            <span>Ana Pérez</span>
            <span>4 productos</span>
            <span>96,00 €</span>
            <span className="status status-delivered">Entregado</span>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Control de stock</h2>
            <p>Estado actual del inventario</p>
          </div>
        </div>

        <div className="stock-list">
          <div className="stock-row stock-header">
            <span>Producto</span>
            <span>Stock</span>
            <span>Estado</span>
          </div>

          {products.map((product) => {
            let statusClass = "stock-available";
            let statusText = "Disponible";

            if (product.stock === 0) {
              statusClass = "stock-out";
              statusText = "Agotado";
            } else if (product.stock <= 10) {
              statusClass = "stock-low";
              statusText = "Stock bajo";
            }

            return (
              <div className="stock-row" key={product._id}>
                <span>{product.name}</span>
                <span>{product.stock} unidades</span>
                <span className={`status ${statusClass}`}>{statusText}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Productos por categoría</h2>
            <p>Distribución actual del catálogo</p>
          </div>
        </div>

        <div className="category-list">
          {Object.entries(productsByCategory).map(([category, total]) => {
            const percentage = products.length
              ? Math.round((total / products.length) * 100)
              : 0;

            return (
              <div className="category-card" key={category}>
                <div className="category-info">
                  <span className="category-name">{category}</span>
                  <span className="category-count">
                    {total} {total === 1 ? "producto" : "productos"}
                  </span>
                </div>
                <span className="category-badge">{percentage}% del total</span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;