import { supabase } from "../lib/SuperBases";

export async function createClient(clientData) {
    // Validar los datos del cliente antes de enviarlos a la base de datos
    const { data, error } = await supabase.from("clients").insert([clientData]).select().single();

    // Manejar errores de manera más robusta
    if (error) {
        throw new Error("Error al crear el cliente: " + error.message);
    }

    return data;
}


export async function getClients() {
    // Obtener la lista de clientes desde la base de datos, ordenados por fecha de creación de manera descendente
    const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false });

    if (error) {
        throw new Error("Error al obtener los clientes: " + error.message);
    }

    return data;
}

export async function updateClient(clientId, updatedData) {
    // Actualizar los datos de un cliente específico en la base de datos
    const { data, error } = await supabase.from("clients").update(updatedData).eq("id", clientId);

    if (error) {
        throw new Error("Error al actualizar el cliente: " + error.message);
    }

    return data;
}

export async function deleteClient(clientId) {
    // Eliminar un cliente específico de la base de datos
    const { data, error } = await supabase.from("clients").delete().eq("id", clientId);

    if (error) {
        throw new Error("Error al eliminar el cliente: " + error.message);
    }

    return data;
}