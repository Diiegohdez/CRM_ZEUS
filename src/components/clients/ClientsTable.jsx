import { CiSearch } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useState } from "react";
import { useClients } from "../../context/ClientsContext";
import { useToast } from "../toast/ToastProvider";
import ModalDelete from "../ui/ModalConfirm";

export default function ClientsTable({ clients = [], search, setSearch, onNewClients, onEditClient, statusFilter, setStatusFilter, loading }) {

    // Obtener las funciones para actualizar y eliminar clientes desde el contexto
    const { deleteClientData } = useClients();

    // Estados para manejar los modales de éxito y error
    const { sucess, errores } = useToast();

    // Estado para controlar la visibilidad del modal de confirmación de eliminación
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // Estado para almacenar el ID del cliente seleccionado para eliminación
    const [selectedId, setSelectedId] = useState(null);



    // Función para abrir el modal de confirmación de eliminación y establecer el ID del cliente seleccionado
    const handleOpenDelete = (id) => {
        setSelectedId(id);
        setOpenDeleteModal(true);
    };

    // Función para manejar la confirmación de eliminación del cliente
    const handleConfirmDelete = async () => {
        try {
            await deleteClientData(selectedId);
            sucess("Cliente eliminado correctamente");
        } catch (error) {
            errores("Error al eliminar el cliente");
        } finally {
            setOpenDeleteModal(false);
            setSelectedId(null);
        }
    };


    // Estado para controlar la página actual en la paginación
    const [currentPage, setCurrentPage] = useState(1);
    // Número de clientes a mostrar por página
    const clientsPerPage = 8;

    // Calcular los índices para la paginación
    const indexOfLast = currentPage * clientsPerPage;
    const indexOfFirst = indexOfLast - clientsPerPage;

    // Obtener los clientes que se mostrarán en la página actual
    const currentClients = clients.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(clients.length / clientsPerPage);


    if (loading) {
        return (
            <div className="bg-[#1F2937] rounded-2xl p-6 animate-pulse">

                {/* Título */}
                <div className="h-6 bg-gray-700 rounded w-1/4 mb-6"></div>

                {/* Input búsqueda */}
                <div className="h-10 bg-gray-800 rounded mb-6"></div>

                {/* Filas simuladas */}
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="grid grid-cols-7 gap-4 mb-4">
                        <div className="h-4 bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-700 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }
    
    return (
        <div className="bg-[#1c2a3a] rounded-2xl p-6 border border-gray-800">

            {/* Título de la tabla con el ícono de notificación */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-[#A9DFD8]">
                    Clientes
                </h2>

                {/* Botón para abrir el modal de nuevo cliente */}
                <button onClick={() => { onNewClients(); }} className="flex items-center gap-2 bg-[#A9DFD8] text-black max-w-64 px-4 py-2 rounded-lg font-bold hover:opacity-90 transition cursor-pointer">
                    <FaUserPlus /> Nuevo Cliente
                </button>
            </div>

            <div className="flex flex-col mb-4 gap-3">
                {/* Buscador */}
                <div className="relative mb-6">
                    <CiSearch className="absolute left-3 top-3 text-gray-800 size={18}" />
                    <input
                        type="text"
                        placeholder="Buscar clientes..."
                        value={search} onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#111] text-sm focus:outline-none focus:ring-1 focus:ring-[#A9DFD8]"
                    />
                </div>
                {/* Filtro de estado */}
                <div className="flex gap-2 flex-wrap">
                    {["all", "lead", "customer", "contactado"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-1 rounded-lg text-sm capitalize transition
                    ${statusFilter === status
                                    ? "bg-[#A9DFD8] text-black"
                                    : "bg-[#111] text-gray-400 hover:bg-gray-700"
                                }`}>
                            {status === "all" ? "Todos" : status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tabla de clientes */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">

                    <thead>
                        <tr className="text-gray-400 border-b border-gray-800">
                            <th className="text-left py-3">Nombre</th>
                            <th className="text-left py-3">Email</th>
                            <th className="text-left py-3">Teléfono</th>
                            <th className="text-left py-3">Empresa</th>
                            <th className="text-left py-3">Nota</th>
                            <th className="text-left py-3">Estado</th>
                            <th className="text-center py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentClients?.length > 0 ? (
                            currentClients.map((client) => (
                                <tr key={client.id} className="border-b border-gray-800 hover:bg-[#111] transition">
                                    <td className="py-4">{client.name}</td>
                                    <td className="py-4 text-gray-300">{client.email}</td>
                                    <td className="py-4 text-gray-300">{client.phone}</td>
                                    <td className="py-4 text-gray-300">{client.company}</td>
                                    <td className="py-4 text-gray-300">{client.notes}</td>

                                    {/* Estado */}
                                    <td className="py-4">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-md font-medium ${client.status === "lead"
                                                ? "bg-gray-700 text-gray-300"
                                                : client.status === "cliente"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-yellow-500/20 text-yellow-400"
                                                }`}
                                        >
                                            {client.status}
                                        </span>
                                    </td>

                                    {/* Acciones */}
                                    <td className="py-4 text-center space-x-3">
                                        <button onClick={() => onEditClient(client)} className="text-blue-400 hover:underline">
                                            Editar
                                        </button>
                                        <button onClick={() => handleOpenDelete(client.id)} className="text-red-400 hover:underline">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-10 text-gray-500"
                                >
                                    No hay clientes aún
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
                {/* Paginación */}
                <div className="flex items-center justify-between mt-6 text-sm text-gray-600">

                    <div className="flex items-center gap-2">
                        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="px-3 py-1 rounded bg-[#111] border border-gray-800 hover:bg-[#1a1a1a] cursor-pointer">
                            <MdNavigateBefore />
                        </button>
                        <span>
                            Página {currentPage} de {totalPages || 1}
                        </span>
                        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))} className="px-3 py-1 rounded bg-[#111] border border-gray-800 hover:bg-[#1a1a1a] cursor-pointer">
                            <MdNavigateNext />
                        </button>
                    </div>
                </div>
            </div>
            {/* Modal de confirmación de eliminación */}
            <ModalDelete
                isOpen={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
}