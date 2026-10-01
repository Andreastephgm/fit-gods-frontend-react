import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/home.css';


export const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Hola');
  const progreso = 65; // Valor estático proveniente de tu JS

  useEffect(() => {
    // Cargar usuario desde localStorage
    const usuarioGuardado = localStorage.getItem('fitGodsUsuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      setUserName(`Hola, ${usuario.nombre}`);
    } else {
      setUserName('Hola');
    }
  }, []);

  // Lógica del botón logoutButton
  const handleLogout = () => {
    const confirmar = window.confirm('¿Quieres cerrar sesión?');
    if (confirmar) {
      localStorage.removeItem('fitGodsUsuario');
      localStorage.removeItem('fitGodsUsuarioActivo');
      navigate('/login');
    }
  };

  return (
    <>
      <header className="top-header">
        <div className="brand">
           <img src="/assets/logo.png" alt="Logo de FIT GODS" className="logo-image" />
          <span>FIT GODS</span>
        </div>
        <button id="logoutButton" type="button" className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <main className="home-container">
        <section className="welcome-section">
          <p className="welcome-small">BIENVENIDO DE NUEVO</p>
          <h1 id="userName">{userName}</h1>
          <p>Sigue trabajando para alcanzar tus objetivos.</p>
        </section>

        <section className="progress-summary">
          <div className="section-title">
            <h2>Tu progreso</h2>
            <Link to="/progress">Ver más</Link>
          </div>
          <div className="progress-card">
            <div className="progress-info">
              <span>Progreso semanal</span>
              <strong id="progressValue">{progreso}%</strong>
            </div>
            <div className="progress-bar">
              <div id="progressBar" className="progress-fill" style={{ width: `${progreso}%` }}></div>
            </div>
            <p>Continúa con tus entrenamientos para mejorar.</p>
          </div>
        </section>

        <section className="routines-section">
          <div className="section-title">
            <h2>Rutinas</h2>
            <Link to="/routines">Ver todas</Link>
          </div>
          <div className="routine-grid">
            <article className="routine-card">
              <div className="routine-image">
                <img src="/assets/piernas.png" alt="Entrenamiento de piernas" />
              </div>
              <div className="routine-content">
                <span className="routine-level">INTERMEDIO</span>
                <h3>Piernas y glúteos</h3>
                <p>Entrenamiento enfocado en tren inferior.</p>
                <Link to="/routines" className="routine-button">Ver rutina</Link>
              </div>
            </article>

            <article className="routine-card">
              <div className="routine-image">
                <img src="/assets/pecho.png" alt="Entrenamiento de pecho" />
              </div>
              <div className="routine-content">
                <span className="routine-level">PRINCIPIANTE</span>
                <h3>Tren superior</h3>
                <p>Rutina para trabajar el tren superior.</p>
                <Link to="/routines" className="routine-button">Ver rutina</Link>
              </div>
            </article>
          </div>
        </section>

        <section className="quick-actions">
          <h2>Accesos rápidos</h2>
          <div className="actions-grid">
            <Link to="/routines" className="action-card">
              <span className="action-icon">🏋️</span>
              <span>Mis rutinas</span>
            </Link>
            <Link to="/progress" className="action-card">
              <span className="action-icon">📈</span>
              <span>Mi progreso</span>
            </Link>
            <Link to="/profile" className="action-card">
              <span className="action-icon">👤</span>
              <span>Mi perfil</span>
            </Link>
          </div>
        </section>
      </main>

      <nav className="bottom-nav">
        <Link to="/home" className="nav-item active"><span>⌂</span><small>Inicio</small></Link>
        <Link to="/routines" className="nav-item"><span>🏋</span><small>Rutinas</small></Link>
        <Link to="/progress" className="nav-item"><span>📊</span><small>Progreso</small></Link>
        <Link to="/profile" className="nav-item"><span>👤</span><small>Perfil</small></Link>
      </nav>
    </>
  );
};