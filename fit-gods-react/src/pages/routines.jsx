import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/routines.css';

export const Routines = () => {
  const [filtroActivo, setFiltroActivo] = useState('todas');
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);

  // Arreglo completo proveniente de tu archivo JS
  const rutinas = [
    {
      id: 1,
      nombre: "Glúteos y piernas",
      categoria: "gluteos",
      categoriaNombre: "GLÚTEOS",
      imagen: "/assets/gluteos.png",
      descripcion: "Rutina enfocada en fortalecer y desarrollar glúteos y piernas.",
      nivel: "Intermedio",
      duracion: "45 min",
      ejercicios: [
        { nombre: "Hip Thrust", detalle: "4 series x 12 repeticiones" },
        { nombre: "Sentadilla Sumo", detalle: "4 series x 10 repeticiones" },
        { nombre: "Abducción", detalle: "3 series x 15 repeticiones" },
        { nombre: "Peso muerto rumano", detalle: "3 series x 12 repeticiones" }
      ]
    },
    {
      id: 2,
      nombre: "Piernas completas",
      categoria: "piernas",
      categoriaNombre: "PIERNAS",
      imagen: "/assets/piernas.png",
      descripcion: "Entrenamiento para trabajar los principales músculos del tren inferior.",
      nivel: "Intermedio",
      duracion: "50 min",
      ejercicios: [
        { nombre: "Prensa", detalle: "4 series x 12 repeticiones" },
        { nombre: "Hack Squat", detalle: "4 series x 10 repeticiones" },
        { nombre: "Femoral", detalle: "3 series x 12 repeticiones" },
        { nombre: "Extensión de piernas", detalle: "3 series x 15 repeticiones" }
      ]
    },
    {
      id: 3,
      nombre: "Tren superior",
      categoria: "superior",
      categoriaNombre: "TREN SUPERIOR",
      imagen: "/assets/pecho.png",
      descripcion: "Rutina para trabajar pecho, espalda, hombros y brazos.",
      nivel: "Principiante",
      duracion: "40 min",
      ejercicios: [
        { nombre: "Press de pecho", detalle: "3 series x 12 repeticiones" },
        { nombre: "Remo", detalle: "3 series x 12 repeticiones" },
        { nombre: "Press de hombros", detalle: "3 series x 10 repeticiones" },
        { nombre: "Curl de bíceps", detalle: "3 series x 12 repeticiones" }
      ]
    },
    {
      id: 4,
      nombre: "Abdomen",
      categoria: "abdomen",
      categoriaNombre: "ABDOMEN",
      imagen: "/assets/abdomen.png",
      descripcion: "Rutina para fortalecer el abdomen y mejorar la estabilidad.",
      nivel: "Principiante",
      duracion: "25 min",
      ejercicios: [
        { nombre: "Crunch abdominal", detalle: "3 series x 15 repeticiones" },
        { nombre: "Elevación de piernas", detalle: "3 series x 12 repeticiones" },
        { nombre: "Plancha", detalle: "3 series x 30 segundos" }
      ]
    }
  ];

  // Lógica de filtrado
  const rutinasFiltradas = filtroActivo === 'todas'
    ? rutinas
    : rutinas.filter((item) => item.categoria === filtroActivo);

  return (
    <>
      <header className="top-header">
        <Link to="/home" className="brand">
          <img src="/assets/logo.png" alt="Logo FIT GODS" className="header-logo" />
          <span>FIT GODS</span>
        </Link>
      </header>

      <main className="routines-container">
        <section className="page-intro">
          <span className="section-label">ENTRENAMIENTO</span>
          <h1>Mis rutinas</h1>
          <p>Elige una rutina y comienza tu entrenamiento.</p>
        </section>

        {/* Botones de filtro de JS */}
        <section className="filters-section">
          <button
            type="button"
            className={`filter-button ${filtroActivo === 'todas' ? 'active' : ''}`}
            onClick={() => setFiltroActivo('todas')}
          >
            Todas
          </button>
          <button
            type="button"
            className={`filter-button ${filtroActivo === 'gluteos' ? 'active' : ''}`}
            onClick={() => setFiltroActivo('gluteos')}
          >
            Glúteos
          </button>
          <button
            type="button"
            className={`filter-button ${filtroActivo === 'piernas' ? 'active' : ''}`}
            onClick={() => setFiltroActivo('piernas')}
          >
            Piernas
          </button>
          <button
            type="button"
            className={`filter-button ${filtroActivo === 'superior' ? 'active' : ''}`}
            onClick={() => setFiltroActivo('superior')}
          >
            Tren superior
          </button>
          <button
            type="button"
            className={`filter-button ${filtroActivo === 'abdomen' ? 'active' : ''}`}
            onClick={() => setFiltroActivo('abdomen')}
          >
            Abdomen
          </button>
        </section>

        {/* Generación dinámica de la lista routinesContainer */}
        <section id="routinesContainer" className="routines-grid">
          {rutinasFiltradas.length === 0 ? (
            <p className="empty-message">No se encontraron rutinas.</p>
          ) : (
            rutinasFiltradas.map((rutina) => (
              <article className="routine-card" key={rutina.id}>
                <div className="routine-image">
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={rutina.imagen} alt={rutina.nombre} />
                  </div>
                </div>

                <div className="routine-content">
                  <span className="routine-category">{rutina.categoriaNombre}</span>
                  <h2>{rutina.nombre}</h2>
                  <p className="routine-description">{rutina.descripcion}</p>

                  <div className="routine-details">
                    <span>{rutina.nivel}</span>
                    <span>{rutina.duracion}</span>
                    <span>{rutina.ejercicios.length} ejercicios</span>
                  </div>

                  <button
                    type="button"
                    className="routine-button"
                    onClick={() => setRutinaSeleccionada(rutina)}
                  >
                    VER EJERCICIOS
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </main>

      {/* Lógica del modal de ejercicios de JS (mostrarEjercicios) */}
      {rutinaSeleccionada && (
        <div className="exercise-modal show" onClick={(e) => e.target.className.includes('exercise-modal') && setRutinaSeleccionada(null)}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>{rutinaSeleccionada.nombre}</h2>
              <button type="button" className="close-modal" onClick={() => setRutinaSeleccionada(null)}>
                ×
              </button>
            </div>

            <div className="exercise-list">
              {rutinaSeleccionada.ejercicios.map((ejercicio, index) => (
                <div className="exercise-item" key={index}>
                  <div className="exercise-info">
                    <h3>{index + 1}. {ejercicio.nombre}</h3>
                    <p>{ejercicio.detalle}</p>
                  </div>
                  <input type="checkbox" className="exercise-check" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav className="bottom-nav">
        <Link to="/home" className="nav-item"><span>⌂</span><small>Inicio</small></Link>
        <Link to="/routines" className="nav-item active"><span>🏋</span><small>Rutinas</small></Link>
        <Link to="/progress" className="nav-item"><span>📊</span><small>Progreso</small></Link>
        <Link to="/profile" className="nav-item"><span>👤</span><small>Perfil</small></Link>
      </nav>
    </>
  );
};