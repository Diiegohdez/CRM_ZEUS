import { NavLink } from "react-router-dom"
import { RiHomeFill } from "react-icons/ri";
import { CiUser, CiViewList, CiTimer, CiSettings, CiLogout } from "react-icons/ci";
import { useAuth } from "../../context/AuthContext";
import zeus_logo from "../../assets/zeus_logo.png";
import zeus_icon from "../../assets/zeus_icon.png";

export default function Sidebar() {

    // Obtener la función de cierre de sesión del contexto de autenticación
    const { signOut } = useAuth();

    // Definir el menú de navegación con sus respectivos íconos y rutas
    const menu = [
        { name: "Dashboard", icon: RiHomeFill, path: "/" },
        { name: "Usuarios", icon: CiUser, path: "/usuarios" },
        { name: "Clientes", icon: CiViewList, path: "/clientes" },
        { name: "Automatizacion", icon: CiTimer, path: "/automatizacion" },
        { name: "Ajuste", icon: CiSettings, path: "/ajuste" },
        { name: "Salir", icon: CiLogout, action: signOut },
    ]

    return (
        <aside className="bg-[#171821] border-r border-gray-700 flex flex-col transition-all duration-300 w-20 lg:w-64 p-3">
            {/* espacio para logo */}
            <div className="h-16 flex items-center justify-center lg:justify-start lg:hidden">
                <img src={zeus_icon} alt="Zeus_Logo" className="w-48 h-16" />
            </div>
            <div className="hidden lg:block h-16 items-center justify-center lg:justify-start lg:px-4">
                <img src={zeus_logo} alt="Zeus_Logo" className="w-48 h-16" />
            </div>

            {/* menú */}
            <nav className="flex flex-col gap-2 mt-6">
                {menu.map((item, i) => {
                    const Icon = item.icon;

                    if (item.action) {
                        return (
                            <button
                                key={i}
                                onClick={item.action}
                                className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all text-gray-400 hover:bg-[#1F2937] hover:text-white w-full"
                            >
                                <Icon size={20} />

                                <span className="hidden lg:block font-medium">
                                    {item.name}
                                </span>
                            </button>
                        );
                    }

                    return (
                        <NavLink
                            key={i}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${isActive
                                    ? "bg-[#A9DFD8] text-[#0F172A]"
                                    : "text-gray-400 hover:bg-[#1F2937] hover:text-white"
                                }`
                            }
                        >
                            <Icon size={20} />

                            <span className="hidden lg:block font-medium">
                                {item.name}
                            </span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );

}