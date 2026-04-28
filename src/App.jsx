import './App.css';
import { Routes, Route } from "react-router-dom"

import Layout from "./components/layout/Layout";

import Dashboard from './Pages/Dashboard';
import User from './Pages/User';
import Clients from './Pages/Clients';
import Automatizacion from './Pages/Automatizacion';
import Ajustes from './Pages/Ajustes';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  
  
  return (
    <Routes>

      {/* 🔓 RUTA PÚBLICA */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🔒 RUTAS PROTEGIDAS */}
      <Route element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="/" element={<Dashboard />} />
        <Route path="/usuarios" element={<User />} />
        <Route path="/clientes" element={<Clients />} />
        <Route path="/automatizacion" element={<Automatizacion />} />
        <Route path="/ajuste" element={<Ajustes />} />
      </Route>
    </Routes>
  )
}

export default App;
