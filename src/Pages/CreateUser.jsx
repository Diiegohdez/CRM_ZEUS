import { useState } from "react";
import { supabase } from "../lib/SuperBases";
import BgImage from "../assets/BgImage.png";
import BgImage2 from "../assets/BgImage2.png";
import { useToast } from "../components/toast/ToastProvider";

export default function CreateUser() {
    // Estados para manejar los modales de éxito y error
    const { sucess, errores } = useToast();

    // Estado para manejar la carga del formulario
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        notes: "",
        status: "lead",
    });

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("clients").insert([formData]);

        if (error) {
            errores("Error al guardar");
        } else {
            sucess("Usuario guardado");

            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                notes: "",
                status: "lead",
            });
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#160430] flex flex-col lg:flex-row">

            {/* IMAGEN DE FONDO */}
            <div className="lg:w-1/2 relative">

                {/* imagen MOBILE */}
                <img
                    src={BgImage} alt="Mobile"
                    className="block lg:hidden w-full h-[50vh] object-cover"
                />

                {/* imagen DESKTOP */}
                <img
                    src={BgImage2} alt="Backgroud"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                />

                {/* DEGRADADO */}
                <div className="hidden lg:block absolute top-0 right-0 h-full w-12
                bg-gradient-to-r from-transparent via-[#160430]/40 to-[#160430] pointer-events-none">
                </div>

            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="flex flex-1 items-center justify-center px-6 py-10 -mt-75 lg:-mt-10">
                <div className="w-full max-w-md z-20">
                    <h1 className="text-4xl font-bold text-white mb-10 text-center lg:text-left">
                        Agregar Usuario
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        <input type="text" placeholder="Nombre" name="name" value={formData.name} onChange={handleChange} required className="bg-[#2A0E4A] text-white placeholder-gray-400 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />

                        <input type="email" placeholder="Correo Electrónico" name="email" value={formData.email} onChange={handleChange} required className="bg-[#2A0E4A] text-white placeholder-gray-400 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />

                        <input type="text" placeholder="Teléfono" name="phone" value={formData.phone} onChange={handleChange} className="bg-[#2A0E4A] text-white placeholder-gray-400 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />

                        <input type="text" placeholder="Empresa" name="company" value={formData.company} onChange={handleChange} className="bg-[#2A0E4A] text-white placeholder-gray-400 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />

                        <textarea placeholder="Notas" name="notes" value={formData.notes} onChange={handleChange} className="bg-[#2A0E4A] text-white placeholder-gray-400 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />

                        <select name="status" value={formData.status} onChange={handleChange} className="bg-[#2A0E4A] text-white placeholder-gray-400 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="lead">Lead</option>
                            <option value="customer">Cliente</option>
                            <option value="contactado">Contactado</option>
                        </select>

                        <button type="submit" disabled={loading} className="mt-4 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition disabled:opacity-50">
                            {loading ? "Creando..." : "Guardar Usuario"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}