import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importación de las páginas del proyecto
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Routines } from './pages/Routines';
import { Progress } from './pages/progress';
import { Profile } from './pages/Profile';

// Componente principal de la aplicación con las rutas de navegación
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige la ruta raíz ("/") directamente a la vista de Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas del dashboard de la aplicación */}
        <Route path="/home" element={<Home />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />

        {/* Redirección por si escriben cualquier otra URL desconocida */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
