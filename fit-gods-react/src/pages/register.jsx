import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/register.css';
import logoReg from '../assets/logo.png';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    fechaNacimiento: '',
    peso: '',
    estatura: '',
    objetivo: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Lógica del evento submit (registerForm)
  const handleSubmit = (e) => {
    e.preventDefault();
    const correoLimpio = formData.correo.trim().toLowerCase();

    const usuarios = JSON.parse(localStorage.getItem('fitGodsUsuarios')) || [];

    // Validar si ya existe el correo
    const usuarioExistente = usuarios.find((user) => user.correo === correoLimpio);

    if (usuarioExistente) {
      alert('Ya existe una cuenta registrada con este correo.');
      return;
    }

    const nuevoUsuario = { ...formData, correo: correoLimpio };
    usuarios.push(nuevoUsuario);

    // Guardar en localStorage
    localStorage.setItem('fitGodsUsuarios', JSON.stringify(usuarios));

    alert('Cuenta creada correctamente.');
    navigate('/login');
  };

  return (
    <main className="register-container">
      <section className="register-card">
        <div className="logo-container">
          <img src={logoReg} alt="Logo de FIT GODS" className="logo-image" />
          <h1>FIT GODS</h1>
          <p className="slogan">SUPERA TUS LÍMITES</p>
        </div>

        <div className="register-content">
          <h2>Crear cuenta</h2>
          <p className="description">Regístrate y comienza a trabajar en tus objetivos.</p>

          <form id="registerForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} placeholder="Tu nombre" required />
              </div>
              <div className="input-group">
                <label htmlFor="apellido">Apellido</label>
                <input type="text" id="apellido" value={formData.apellido} onChange={handleChange} placeholder="Tu apellido" required />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="correo">Correo electrónico</label>
              <input type="email" id="correo" value={formData.correo} onChange={handleChange} placeholder="Ingresa tu correo" required />
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Crea una contraseña" minLength="6" required />
            </div>

            <div className="input-group">
              <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
              <input type="date" id="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="peso">Peso (kg)</label>
                <input type="number" id="peso" value={formData.peso} onChange={handleChange} placeholder="Ej. 60" min="1" max="300" step="0.1" required />
              </div>
              <div className="input-group">
                <label htmlFor="estatura">Estatura (m)</label>
                <input type="number" id="estatura" value={formData.estatura} onChange={handleChange} placeholder="Ej. 1.70" min="0.5" max="2.5" step="0.01" required />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="objetivo">Objetivo</label>
              <select id="objetivo" value={formData.objetivo} onChange={handleChange} required>
                <option value="" disabled>Selecciona tu objetivo</option>
                <option value="perder-peso">Perder peso</option>
                <option value="ganar-musculo">Ganar masa muscular</option>
                <option value="mantener">Mantenerme en forma</option>
                <option value="resistencia">Mejorar resistencia</option>
              </select>
            </div>

            <button type="submit" className="register-button">CREAR CUENTA</button>
          </form>

          <p className="login-text">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </section>
    </main>
  );
};