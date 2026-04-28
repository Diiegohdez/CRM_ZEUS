import { useContext, useState, createContext } from "react";
import { createClient, getClients, updateClient, deleteClient } from "../services/ClientsService";


// Crear el contexto
const ClientsContext = createContext();

// Proveedor del contexto
export function ClientsProvider({ children }) {

    // Estado para almacenar la lista de clientes
    const [clients, setClients] = useState([]);

    // Estado para manejar la carga de datos
    const [loading, setLoading] = useState(false);


    // Función para agregar un nuevo cliente a la lista
    const addClient = async (clientData) => {

        try {
            // Llamar a la función del servicio para crear un nuevo cliente y actualizar el estado con el nuevo cliente
            const newClient = await createClient(clientData);
            setClients((prevClients) => [...prevClients, newClient]);
            return newClient;
        } catch (error) {
            console.error("Error al agregar cliente:", error);
        }
    }

    const fetchClients = async () => {
        try {
            // Llamar a la función del servicio para obtener la lista de clientes y actualizar el estado con los clientes obtenidos
            setLoading(true);
            const clientsData = await getClients();
            setClients(clientsData);
        } catch (error) {
            console.error("Error al obtener clientes:", error);
        } finally {            
            setLoading(false);
        }
    }

    const updateClientData = async (clientId, updatedData) => {
        try {
            // Llamar a la función del servicio para actualizar un cliente específico y actualizar el estado con el cliente actualizado
            await updateClient(clientId, updatedData);

            setClients((prev) =>
                prev.map((client) =>
                    client.id === clientId ? { ...client, ...updatedData } : client
                )
            )
        } catch (error) {
            console.error("Error al actualizar cliente:", error);
        }
    };

    const deleteClientData = async (clientId) => {
        try {
            // Llamar a la función del servicio para eliminar un cliente específico y actualizar el estado eliminando el cliente eliminado  
            await deleteClient(clientId);

            setClients((prev) => prev.filter((client) => client.id !== clientId));
        } catch (error) {
            console.error("Error al eliminar cliente:", error);
        }
    };



    return (
        <ClientsContext.Provider value={{ clients, addClient, fetchClients, updateClientData, deleteClientData, loading }}>
            {children}
        </ClientsContext.Provider>
    );
}

// Hook personalizado para usar el contexto
export function useClients() {
    return useContext(ClientsContext);
}