import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/toast/ToastProvider";
import { supabase } from "../lib/SuperBases";

export default function User() {

    // Obtener el usuario autenticado desde el contexto de autenticación
    const { user } = useAuth();

    // Obtener la función para mostrar toasts de éxito y error desde el contexto del Toast
    const { sucess, errores } = useToast();

    // Estado para almacenar la nueva contraseña ingresada por el usuario
    const [password, setPassword] = useState("");

    // Estado para indicar si se está cargando la solicitud de cambio de contraseña
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validar que se haya ingresado una nueva contraseña
        try {
            const { error } = await supabase.auth.updateUser({ password: password });

            if (error) throw error;

            sucess("Contraseña actualizada correctamente");
            setPassword("");
        } catch (error) {
            errores("Error al cambiar la contraseña");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 text-white max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-[#A9DFD8]">
                Usuarios
            </h1>

            {/* INFO USUARIO */}
            <div className="bg-[#1F2937] p-6 rounded-2xl shadow-2xl mb-4">
                <h2 className="text-lg font-semibold mb-4">
                    Información del Usuario
                </h2>

                <p className="text-gray-300">
                    <span className="text-gray-400">Correo:</span> {user?.email}
                </p>
            </div>

            {/* CAMBIAR CONTRASEÑA */}
            <div className="bg-[#1F2937] p-6 rounded-2xl shadow-2xl mb-4">
                <h2 className="text-lg font-semibold mb-4">
                    Cambiar Contraseña
                </h2>

                <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
                    
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-[#111827] p-3 rounded-lg text-white outline-none border border-gray-700 focus:border-[#A9DFD8]"
                            placeholder="Ingresa tu nueva contraseña"
                            required
                        />
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#A9DFD8] text-[#0F172A] py-2 rounded-lg font-semibold hover:opacity-90 transition">
                        {loading ? "Cambiando..." : "Cambiar Contraseña"}
                    </button>
                </form>
            </div>
        </div>
    );
}