import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';

export const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Lógica del evento submit (loginForm)
  const handleSubmit = (e) => {
    e.preventDefault();
    const correoLimpio = correo.trim().toLowerCase();

    // Obtener usuarios guardados en localStorage
    const usuarios = JSON.parse(localStorage.getItem('fitGodsUsuarios')) || [];

    // Buscar coincidencia de credenciales
    const usuarioEncontrado = usuarios.find(
      (user) => user.correo === correoLimpio && user.password === password
    );

    if (!usuarioEncontrado) {
      alert('El correo o la contraseña son incorrectos.');
      return;
    }

    // Guardar sesión activa
    localStorage.setItem('fitGodsUsuarioActivo', JSON.stringify(usuarioEncontrado));
    localStorage.setItem('fitGodsUsuario', JSON.stringify(usuarioEncontrado));

    alert(`Bienvenido/a ${usuarioEncontrado.nombre}.`);
    navigate('/home');
  };

  return (
    <main className="login-container">
      <section className="login-card">
        <div className="logo-container">
          <img src="/assets/logo.png" alt="Logo de FIT GODS" className="logo-image" />
          <h1>FIT GODS</h1>
          <p className="slogan">SUPERA TUS LÍMITES</p>
        </div>

        <div className="login-content">
          <h2>Inicia sesión</h2>
          <p className="description">Bienvenido de vuelta, estás a un paso de tu mejor versión.</p>

          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="correo">Correo electrónico</label>
              <input
                type="email"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Ingresa tu correo"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  id="togglePassword"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>

            <button type="submit" className="login-button">
              INICIAR SESIÓN
            </button>
          </form>

          <p className="register-text">
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </div>
      </section>
    </main>
  );
};