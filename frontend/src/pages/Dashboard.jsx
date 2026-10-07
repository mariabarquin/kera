function Dashboard() {
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
          <span className="metric-value">24</span>
          <span className="metric-label">Productos</span>
        </article>

        <article className="metric-card">
          <span className="metric-value">5</span>
          <span className="metric-label">Stock bajo</span>
        </article>

        <article className="metric-card">
          <span className="metric-value">1.284 €</span>
          <span className="metric-label">Ventas</span>
        </article>
      </section>
    </main>
  );
}

export default Dashboard;