import { useState, useEffect, use } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/toast/ToastProvider";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "../components/ui/PasswordInput";

export default function Login() {

    const { signIn, user } = useAuth(); // Obtener la función de inicio de sesión del contexto de autenticación
    const { errores, sucess } = useToast(); // Obtener la función para mostrar toasts de error y éxito del contexto de toast
    const navigation = useNavigate(); // Hook para navegar programáticamente entre rutas

    const [formData, setFormData] = useState({
        email: "", // Estado para almacenar el correo electrónico ingresado por el usuario
        password: "" // Estado para almacenar la contraseña ingresada por el usuario
    });

    useEffect(() => {
        if (user) {
            navigation("/"); // Redirigir al usuario a la página principal si ya está autenticado
        }
    }, [user, navigation]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Actualizar el estado del formulario con el valor ingresado por el usuario
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        try {
            (""); // Limpiar cualquier mensaje previo antes de intentar iniciar sesión
            await signIn(formData.email, formData.password); // Intentar iniciar sesión con el correo electrónico y la contraseña proporcionados
            navigation("/"); // Redirigir al usuario a la página principal después de un inicio de sesión exitoso
        } catch (error) {
            errores(error.message); // Si ocurre un error durante el inicio de sesión, actualizar el estado de error para mostrar el mensaje al usuario
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#111827] text-white">
            <form onSubmit={handleSubmit} className="bg-[#1F2937] p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-[#A9DFD8] mb-6 text-center">
                    Iniciar Sesión
                </h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded bg-[#111827] border border-gray-600"
                />

                <PasswordInput
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded bg-[#111827] border border-gray-600"
                />

                <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#A9DFD8] text-black font-semibold cursor-pointer">
                    Entrar
                </button>

                <p className="text-center mt-4 text-gray-400">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register" className="text-[#A9DFD8] hover:underline">
                        Registrarse
                    </Link>
                </p>
            </form>
        </div>
    )
}