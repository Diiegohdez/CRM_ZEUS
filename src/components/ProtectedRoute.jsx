import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// Componente de ruta protegida que verifica si el usuario está autenticado antes de renderizar el componente hijo
export default function ProtectedRoute({ children }) {

    const { user, loading } = useAuth(); // Obtener el estado de autenticación del contexto

    if (loading) return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se verifica la autenticación

    if (!user) return <Navigate to="/login" />; // Si no hay un usuario autenticado, redirigir a la página de inicio de sesión

    return children; // Si el usuario está autenticado, renderizar el componente hijo

}