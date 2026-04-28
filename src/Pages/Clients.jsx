import { useEffect, useState } from "react";
import { useClients } from "../context/ClientsContext";
import ClientsTable from "../components/clients/ClientsTable";
import CreateClients from "../components/clients/CreateClients";
import ModalCreateClients from "../components/ui/ModalCreateClients";

export default function Clients() {

    // Obtener la lista de clientes desde el contexto
    const { clients, fetchClients, loading } = useClients();

    // Estado para controlar la apertura del modal de nuevo cliente
    const [OpenModal, setOpenModal] = useState(false);

    // Estado para almacenar el cliente seleccionado
    const [ selectedClient, setSelectedClient ] = useState(null);

    // Estado para manejar la búsqueda de clientes
    const [search, setSearch] = useState("");

    // Estado para manejar el filtro de estado de los clientes
    const [ statusFilter, setStatusFilter ] = useState("all");

    useEffect(() => {
        // Llamar a la función para obtener la lista de clientes cuando el componente se monte
        fetchClients();
    }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente


    // Filtrar los clientes según el término de búsqueda ingresado por el usuario
    const filteredClients = clients.filter((client) => {
        if (!client) return false; 
        const value = search.toLowerCase();

        const matchesSearch =
            client.name?.toLowerCase().includes(value) ||
            client.email?.toLowerCase().includes(value) ||
            client.company?.toLowerCase().includes(value) ||
            client.phone?.toLowerCase().includes(value);

        const matchesStatus =
            statusFilter === "all" || client.status === statusFilter;

        return matchesSearch && matchesStatus;
    });


    return (
        <div  className="p-6 text-white">
            {/* Renderizar la tabla de clientes y pasar la lista de clientes obtenida desde el contexto y selecciona un cliente para modificar */}
            <ClientsTable clients={filteredClients} search={search} setSearch={setSearch} onNewClients={() => {setOpenModal(true); setSelectedClient(null)}} onEditClient={(client) => {setOpenModal(true); setSelectedClient(client)}} statusFilter={statusFilter} setStatusFilter={setStatusFilter} loading={loading}   />

            {/* Aquí podrías agregar el componente del modal para crear un nuevo cliente, pasando OpenModal como prop para controlar su visibilidad */}
            <ModalCreateClients isOpen={OpenModal} onClose={() => setOpenModal(false)}>
                <CreateClients onClose={() => setOpenModal(false)} client={selectedClient} />
            </ModalCreateClients>
        </div>
    );
}