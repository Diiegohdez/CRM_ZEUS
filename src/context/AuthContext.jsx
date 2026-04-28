import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../lib/SuperBases"; 

// Crear el contexto de autenticación para manejar el estado de autenticación en toda la aplicación
const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación desde cualquier componente
export const useAuth = () => useContext(AuthContext);

// Componente proveedor de autenticación que envuelve a los componentes hijos y proporciona el estado de autenticación y las funciones relacionadas
export function AuthProvider({ children }) {

    const [user, setUser] = useState(null); // Estado para almacenar la información del usuario autenticado
    const [loading, setLoading] = useState(true); // Estado para manejar la carga de la autenticación


    // Función para registrar un nuevo usuario utilizando Supabase
    const signUp = async (email, password) => {

        const { data, error } = await supabase.auth.signUp({ email, password }); // Llamada a la función de registro de Supabase

        if (error) throw error; // Si hay un error, lanzarlo para que pueda ser manejado por el componente que llama a esta función

        return data;

    };

    // Función para iniciar sesión con un usuario existente utilizando Supabase
    const signIn = async (email, password) => {

        const { data, error } = await supabase.auth.signInWithPassword({ email, password }); // Llamada a la función de inicio de sesión de Supabase

        if (error) throw error; // Si hay un error, lanzarlo para que pueda ser manejado por el componente que llama a esta función

        return data;
    };

    // Función para cerrar sesión del usuario utilizando Supabase
    const signOut = async () => {

        await supabase.auth.signOut(); // Llamada a la función de cierre de sesión de Supabase
        setUser(null); // Limpiar el estado del usuario al cerrar sesión
    };

    useEffect(() => {

        const getSession = async () => {
            const { data } = await supabase.auth.getSession(); // Obtener la sesión actual del usuario desde Supabase
            setUser(data.session?.user ?? null); // Actualizar el estado del usuario con la información de la sesión
            setLoading(false); // Indicar que la carga de autenticación ha finalizado
        };

        getSession(); // Llamar a la función para obtener la sesión al montar el componente

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null); // Actualizar el estado del usuario cuando cambie el estado de autenticación
        });

        return () => listener.subscription.unsubscribe(); // Limpiar el listener de cambios de autenticación al desmontar el componente

    }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

    return (
        <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
            {children} 
        </AuthContext.Provider>
    );

}