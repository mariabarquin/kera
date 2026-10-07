import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Si el usuario intenta añadir algo al carrito, se captura el mensaje/origen
  const redirectMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Iniciar sesión (authService guarda el token y el user en localStorage)
      const data = await loginUser({ email, password });

      const userRole = data.user?.role;

      // 2. Redirección condicionada por rol
      if (userRole === "admin") {
        navigate("/");
      } else {
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Lado Contextual / Introducción KERA */}
        <div className="auth-brand-side">
          <span className="auth-tag">KERA — NATURAL COSMETICS</span>
          <h2>Tu ritual de cuidado personal empieza aquí.</h2>
          <p>
            Accede a tu cuenta para gestionar tus pedidos, guardar tus fórmulas favoritas 
            y disfrutar de una experiencia de compra personalizada.
          </p>
        </div>

        {/* Formulario Integrado */}
        <div className="auth-form-side">
          <h3>Iniciar Sesión</h3>

          {/* Mensaje contextual si viene de una acción interceptada (ej. añadir al carrito) */}
          {redirectMessage && (
            <div className="auth-info-banner">
              {redirectMessage}
            </div>
          )}

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="kera-field">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                className="kera-input"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="kera-field">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                className="kera-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="kera-btn">
              Acceder a mi cuenta
            </button>
          </form>

          <p className="auth-switch">
            ¿Aún no tienes cuenta? <Link to="/register">Crear cuenta</Link>
          </p>
        </div>
      </div>
    </div>
  );
}