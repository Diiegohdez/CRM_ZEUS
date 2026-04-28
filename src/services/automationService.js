import { supabase } from "../lib/SuperBases";

// Función para crear una nueva automatización
export const createAutomation = async (automationData) => {
    const { data, error } = await supabase
        .from("automations")
        .insert([automationData])
        .select()
        .single();

    if (error) throw error; // Manejo de errores

    return data;

};
// Función para obtener todas las automatizaciones
export const getAutomations = async () => {
    const { data, error } = await supabase
        .from("automations")
        .select(`*,clients(name)`).order("due_date", { ascending: false });

    if (error) throw error; // Manejo de errores    

    return data;
};

// Función para actualizar una automatización existente
export const updateAutomation = async (id, status) => {
    const { data, error } = await supabase
        .from("automations")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error; // Manejo de errores

    return data;
};