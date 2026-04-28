import { useClients } from "../../context/ClientsContext";
import { useAutomation } from "../../context/AutomationContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../toast/ToastProvider";
import { useState, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";

export default function Clients({ onClose, client }) {
    // Obtener la lista de clientes desde el contexto
    const { addClient, updateClientData, fetchClients } = useClients();

    // Obtener las funciones y el estado de las automatizaciones desde el contexto
    const { addAutomation } = useAutomation();

    // Obtener el usuario autenticado desde el contexto de autenticación
    const { user } = useAuth();

    // Estados para manejar los modales de éxito y error
    const { sucess, errores } = useToast();

    // Estado para manejar la carga del formulario
    const [loading, setLoading] = useState(false);

    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        name: client?.name || "",
        email: client?.email || "",
        phone: client?.phone || "",
        company: client?.company || "",
        notes: client?.notes || "",
        status: client?.status || "lead",
    });

    // Efecto para actualizar el formulario cuando se recibe un cliente para editar
    useEffect(() => {
        if (client) {
            setFormData(client);
        }
    }, [client]);

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

        try {

            if (client) {
                // ✏️ EDITAR
                await updateClientData(client.id, formData);
                sucess("Cliente actualizado");
            } else {
                // ➕ CREAR
                const newClient = await addClient(formData);
                // Crear una automatización de seguimiento para el nuevo cliente
                await addAutomation({
                    user_id: user.id,
                    client_id: newClient.id,
                    task: "Seguimiento inicial",
                    due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Fecha de vencimiento a una semana
                    status: "pendiente",
                });
                sucess("Cliente agregado exitosamente");
            }

            await fetchClients(); 
            onClose(); // cerrar modal

            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                notes: "",
                status: "lead",
            });

        } catch (error) {
            console.log("ERROR REAL:", error);
            errores("Error al guardar cliente");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-[#1F2937] rounded-2xl p-8 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-[#A9DFD8] mb-6">
                        {client ? "Editar Cliente" : "Crear Cliente"}
                    </h1>
                    <button onClick={onClose} className="text-gray-400 hover:text-[#A9DFD8] text-3xl mb-4">
                        <IoCloseCircle />
                    </button>
                </div>

                {/* Formulario para crear un nuevo cliente */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input type="text" placeholder="Nombre" name="name" value={formData.name} onChange={handleChange} required className="input" />

                    <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required className="input" />

                    <input type="text" placeholder="Teléfono" name="phone" value={formData.phone} onChange={handleChange} required className="input" />

                    <input type="text" placeholder="Empresa" name="company" value={formData.company} onChange={handleChange} className="input" />

                    <select
                        name="status" value={formData.status} onChange={handleChange} className="input md:col-span-2">
                        <option value="lead">Lead</option>
                        <option value="customer">Cliente</option>
                        <option value="contactado">Contactado</option>
                    </select>

                    <textarea placeholder="Notas" name="notes" value={formData.notes} onChange={handleChange} className="input md:col-span-2 h-32" />

                    <button type="submit" disabled={loading} className="md:col-span-2 mt-4 py-3 rounded-xl text-black font-semibold bg-[#A9DFD8] hover:opacity-90 transition disabled:opacity-50 cursor-pointer">
                        {loading ? "Guardando..." : "Guardar Cliente"}
                    </button>
                </form>
            </div>
        </div>
    );
}