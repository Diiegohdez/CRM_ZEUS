import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { IoExitOutline, IoSettingsOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";

export default function UserMenu() {

    // Estado para controlar si el menú desplegable está abierto o cerrado
    const [isOpen, setIsOpen] = useState(false);

    // Manejar el cierre de sesión del usuario
    const { signOut, user } = useAuth();

    // Función para manejar el clic en la opción de cerrar sesión
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut(); // Llamar a la función de cierre de sesión del contexto de autenticación
        navigate("/login"); // Redirigir al usuario a la página de inicio de sesión después de cerrar sesión
    };

    return (
        <div className="relative">
            {/* Avatar del usuario */}
            <div onClick={()=> setIsOpen(!isOpen)} className="w-10 h-10 bg-gray-600 rounded-full cursor-pointer flex items-center justify-center text-white font-bold">
                {user?.email?.charAt(0).toUpperCase()}{/* Mostrar la primera letra del correo electrónico del usuario como avatar */}
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1F2937] rounded-2xl shadow-lg border border-gray-700 z-50">
                    <div className="p-3 border-b border-gray-700 text-sm  text-gray-300">
                        {user?.email} {/* Mostrar el correo electrónico del usuario en el menú desplegable */}
                    </div>

                    <button onClick={()=> navigate("/usuarios")} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#374151]">
                        <CiUser /> Perfil {/* Opción para ver el perfil */}
                    </button>

                    <button onClick={()=> navigate("/ajuste")} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#374151]">
                        <IoSettingsOutline /> Ajustes {/* Opción para ir a la página de ajustes */}
                    </button>

                    <button onClick={handleSignOut} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#374151]">
                        <IoExitOutline /> Cerrar sesión {/* Opción para cerrar sesión */}
                    </button>
                </div>
            )}
        </div>
    );
}