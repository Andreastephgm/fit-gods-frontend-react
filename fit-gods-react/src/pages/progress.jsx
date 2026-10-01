import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/progress.css';

export const Progress = () => {
  const [registros, setRegistros] = useState([]);
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [peso, setPeso] = useState('');
  const [avance, setAvance] = useState('');
  const [observaciones, setObservaciones] = useState('');

  // Cargar datos al renderizar (mostrarHistorial y actualizarResumen)
  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('fitGodsProgreso')) || [];
    setRegistros(datos);
  }, []);

  // Lógica del evento submit (progressForm)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (fecha === '' || peso === '' || avance === '') {
      alert('Completa los campos obligatorios.');
      return;
    }

    if (Number(peso) <= 0 || Number(avance) < 0 || Number(avance) > 100) {
      alert('Ingresa valores válidos.');
      return;
    }

    const nuevoRegistro = {
      fecha: fecha,
      peso: Number(peso),
      avance: Number(avance),
      observaciones: observaciones.trim()
    };

    const nuevosRegistros = [...registros, nuevoRegistro];
    setRegistros(nuevosRegistros);
    localStorage.setItem('fitGodsProgreso', JSON.stringify(nuevosRegistros));

    // Resetear campos
    setPeso('');
    setAvance('');
    setObservaciones('');
    setFecha(new Date().toISOString().split('T')[0]);

    alert('Registro guardado correctamente.');
  };

  const ultimoRegistro = registros[registros.length - 1] || { peso: 0, avance: 0 };

  return (
    <>
      <header className="top-header">
        <Link to="/home" className="brand">
          <img src="/assets/logo.png" alt="Logo FIT GODS" className="header-logo" />
          <span>FIT GODS</span>
        </Link>
      </header>

      <main className="progress-container">
        <section className="page-intro">
          <span className="section-label">SEGUIMIENTO</span>
          <h1>Mi progreso</h1>
          <p>Consulta tus avances y registra tus resultados.</p>
        </section>

        {/* Tarjetas de resumen */}
        <section className="summary-grid">
          <article className="summary-card">
            <span className="summary-label">PESO ACTUAL</span>
            <strong id="currentWeight">{ultimoRegistro.peso} kg</strong>
          </article>
          <article className="summary-card">
            <span className="summary-label">AVANCE</span>
            <strong id="currentProgress">{ultimoRegistro.avance}%</strong>
          </article>
          <article className="summary-card">
            <span className="summary-label">REGISTROS</span>
            <strong id="recordCount">{registros.length}</strong>
          </article>
        </section>

        <section className="progress-section">
          <div className="section-title">
            <h2>Avance general</h2>
            <span id="progressPercentage">{ultimoRegistro.avance}%</span>
          </div>
          <div className="progress-bar">
            <div id="progressFill" className="progress-fill" style={{ width: `${ultimoRegistro.avance}%` }}></div>
          </div>
        </section>

        {/* Formulario */}
        <section className="register-progress">
          <h2>Registrar progreso</h2>
          <form id="progressForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="fecha">Fecha</label>
                <input type="date" id="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
              </div>
              <div className="input-group">
                <label htmlFor="peso">Peso (kg)</label>
                <input type="number" id="peso" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ej. 60" min="1" max="300" step="0.1" required />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="avance">Porcentaje de avance</label>
              <input type="number" id="avance" value={avance} onChange={(e) => setAvance(e.target.value)} placeholder="Ej. 70" min="0" max="100" required />
            </div>

            <div className="input-group">
              <label htmlFor="observaciones">Observaciones</label>
              <textarea id="observaciones" value={observaciones} onChange={(e) => setObservaciones(e.target.value)} rows="3" placeholder="Escribe cómo te fue..."></textarea>
            </div>

            <button type="submit" className="save-button">GUARDAR REGISTRO</button>
          </form>
        </section>

        {/* Historial renderizado dinámicamente de JS */}
        <section className="history-section">
          <h2>Historial</h2>
          <div id="historyContainer">
            {registros.length === 0 ? (
              <div className="empty-history">Todavía no tienes registros de progreso.</div>
            ) : (
              [...registros].reverse().map((reg, idx) => (
                <article className="history-item" key={idx}>
                  <div className="history-date">{reg.fecha}</div>
                  <div className="history-info">
                    <h3>Avance registrado: {reg.avance}%</h3>
                    <p>{reg.observaciones || 'Sin observaciones'}</p>
                  </div>
                  <div className="history-weight">{reg.peso} kg</div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>

      <nav className="bottom-nav">
        <Link to="/home" className="nav-item"><span>⌂</span><small>Inicio</small></Link>
        <Link to="/routines" className="nav-item"><span>🏋</span><small>Rutinas</small></Link>
        <Link to="/progress" className="nav-item active"><span>📊</span><small>Progreso</small></Link>
        <Link to="/profile" className="nav-item"><span>👤</span><small>Perfil</small></Link>
      </nav>
    </>
  );
};