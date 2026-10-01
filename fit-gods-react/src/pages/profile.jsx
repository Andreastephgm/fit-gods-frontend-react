import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/profile.css';

export const Profile = () => {
  const navigate = useNavigate();

  const datosIniciales = {
    nombre: '',
    apellido: '',
    correo: 'correo@ejemplo.com',
    fechaNacimiento: '',
    peso: 55,
    estatura: 1.70,
    objetivo: 'Ganar masa muscular'
  };

  const [usuario, setUsuario] = useState(datosIniciales);

  // Cargar función cargarPerfil de JS
  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem('fitGodsUsuario'));
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
  }, []);

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.id]: e.target.value
    });
  };

  // Evento submit (profileForm)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usuario.nombre.trim() || !usuario.apellido.trim() || !usuario.correo.trim()) {
      alert('Completa los campos obligatorios.');
      return;
    }

    localStorage.setItem('fitGodsUsuario', JSON.stringify(usuario));
    alert('Los datos se actualizaron correctamente.');
  };

  // Evento del botón de cerrar sesión
  const handleLogout = () => {
    const confirmar = window.confirm('¿Deseas cerrar sesión?');
    if (confirmar) {
      localStorage.removeItem('fitGodsUsuarioActivo');
      navigate('/login');
    }
  };

  const nombreCompleto = `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim() || 'Usuario';

  return (
    <>
      <header className="top-header">
        <Link to="/home" className="brand">
          <img src="/assets/logo.png" alt="Logo FIT GODS" className="header-logo" />
          <span>FIT GODS</span>
        </Link>
      </header>

      <main className="profile-container">
        <section className="page-intro">
          <span className="section-label">MI CUENTA</span>
          <h1>Mi perfil</h1>
          <p>Consulta y actualiza tu información personal.</p>
        </section>

        <section className="profile-card">
          <div className="profile-avatar">👤</div>
          <div className="profile-main-info">
            <h2 id="profileName">{nombreCompleto}</h2>
            <p id="profileEmail">{usuario.correo || 'Sin correo registrado'}</p>
          </div>
        </section>

        <section className="profile-section">
          <div className="section-heading">
            <h2>Información personal</h2>
            <span>Datos de tu cuenta</span>
          </div>

          <form id="profileForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" value={usuario.nombre} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="apellido">Apellido</label>
                <input type="text" id="apellido" value={usuario.apellido} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="correo">Correo electrónico</label>
              <input type="email" id="correo" value={usuario.correo} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
              <input type="date" id="fechaNacimiento" value={usuario.fechaNacimiento} onChange={handleChange} />
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="peso">Peso (kg)</label>
                <input type="number" id="peso" value={usuario.peso} onChange={handleChange} step="0.1" />
              </div>
              <div className="input-group">
                <label htmlFor="estatura">Estatura (m)</label>
                <input type="number" id="estatura" value={usuario.estatura} onChange={handleChange} step="0.01" />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="objetivo">Objetivo</label>
              <select id="objetivo" value={usuario.objetivo} onChange={handleChange}>
                <option value="Perder peso">Perder peso</option>
                <option value="Ganar masa muscular">Ganar masa muscular</option>
                <option value="Mejorar condición física">Mejorar condición física</option>
                <option value="Mantener peso">Mantener peso</option>
              </select>
            </div>

            <button type="submit" className="save-button">GUARDAR CAMBIOS</button>
          </form>
        </section>

        <section className="options-section">
          <h2>Opciones</h2>
          <button id="logoutButton" type="button" className="option-button" onClick={handleLogout}>
            <span>↪</span>
            <div>
              <strong>Cerrar sesión</strong>
              <small>Salir de tu cuenta</small>
            </div>
          </button>
        </section>
      </main>

      <nav className="bottom-nav">
        <Link to="/home" className="nav-item"><span>⌂</span><small>Inicio</small></Link>
        <Link to="/routines" className="nav-item"><span>🏋</span><small>Rutinas</small></Link>
        <Link to="/progress" className="nav-item"><span>📊</span><small>Progreso</small></Link>
        <Link to="/profile" className="nav-item active"><span>👤</span><small>Perfil</small></Link>
      </nav>
    </>
  );
};