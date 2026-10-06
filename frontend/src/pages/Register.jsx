import { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser({ name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h1 className="auth-title">Registro</h1>
        <p className="auth-sub">Crea una cuenta en KERA.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="kera-field">
            <label htmlFor="name">Nombre completo</label>
            <input 
              id="name"
              type="text" 
              className="kera-input"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="kera-field">
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              className="kera-input"
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
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="kera-btn">Crear Cuenta</button>
        </form>

        <p className="auth-switch">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}