import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/toast/ToastProvider";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "../components/ui/PasswordInput";

export default function Register() {

    const { signUp } = useAuth(); // Obtener la función de registro del contexto de autenticación
    const { sucess, errores } = useToast(); // Obtener las funciones para mostrar toasts de éxito y error del contexto de toast
    const navigation = useNavigate(); // Hook para navegar programáticamente entre rutas

    const [formData, setFormData] = useState({
        email: "", // Estado para almacenar el correo electrónico ingresado por el usuario
        password: "", // Estado para almacenar la contraseña ingresada por el usuario
        confirmPassword: "" // Estado para almacenar la confirmación de la contraseña ingresada por el usuario
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Actualizar el estado del formulario con el valor ingresado por el usuario
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        if (formData.password !== formData.confirmPassword) { // Verificar que la contraseña y la confirmación de contraseña coincidan
            errores("Las contraseñas no coinciden");
            return;
        }

        try {
            await signUp(formData.email, formData.password); // Intentar registrar al usuario con el correo electrónico y la contraseña proporcionados
            sucess("Usuario registrado exitosamente"); // Mostrar un toast de éxito si el registro fue exitoso

            setTimeout(() => {
                navigation("/login"); // Redirigir al usuario a la página de inicio de sesión después de un breve retraso para mostrar el toast
            }, 1500);
        } catch (error) {
            errores(error.message); // Si ocurre un error durante el registro, mostrar un toast de error con el mensaje del error
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#111827] text-white">
            <form onSubmit={handleSubmit} className="bg-[#1F2937] p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-[#A9DFD8] mb-6 text-center">
                    Registrarse
                </h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded bg-[#111827] border border-gray-600"
                    required
                />

                <PasswordInput
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded bg-[#111827] border border-gray-600" required />

                <PasswordInput
                    type="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded bg-[#111827] border border-gray-600"
                    required
                />

                <button
                    type="submit" className="w-full py-3 rounded-xl bg-[#A9DFD8] text-black font-semibold cursor-pointer">
                    Registrarse
                </button>

                <p className="text-center mt-4 text-gray-400">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-[#A9DFD8] hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </form>
        </div>
    );
}