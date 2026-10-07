import { Link } from "react-router-dom";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "/login";
  };

  return (
    <header className="kera-header">
      <nav className="kera-nav-links">
        <Link to="/">Products</Link>
        <Link to="/">About Kera</Link>
      </nav>

      <Link className="kera-brand" to="/">
        kera
      </Link>

      <nav className="kera-nav-links">
        {user ? (
          <>
            <span style={{ fontSize: "0.8rem", textTransform: "none" }}>
              Hola, {user.name}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
                textTransform: "uppercase",
              }}
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
        <Link to="/cart">Cart (0)</Link>
      </nav>
    </header>
  );
}