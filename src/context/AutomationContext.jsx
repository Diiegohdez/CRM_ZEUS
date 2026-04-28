import { useContext, createContext, useState } from "react";
import { createAutomation, getAutomations, updateAutomation } from "../services/automationService";

// Contexto para las automatizaciones
const AutomationContext = createContext();

// Hook personalizado para acceder al contexto de automatizaciones
export const useAutomation = () => useContext(AutomationContext);

// Proveedor de contexto para las automatizaciones
export function AutomationProvider({ children }) {

    const [automations, setAutomations] = useState([]); // Estado para almacenar las automatizaciones

    const fetchAutomations = async () => {
        try {
            const data = await getAutomations(); // Obtener las automatizaciones desde el servicio
            setAutomations(data); 
        } catch (error) {
            console.error("Error obteniendo automatizaciones:", error); // Manejo de errores
        }
    };

    const addAutomation = async (automationData) => {
        const newAutomation = await createAutomation(automationData); // Crear una nueva automatización utilizando el servicio
        setAutomations((prev) => [newAutomation, ...prev]); // Agregar la nueva automatización al estado
        return newAutomation;
    };

    const changeAutomationStatus = async (id, status) => {
        await updateAutomation(id, status); // Actualizar el estado de la automatización utilizando el servicio
        setAutomations((prev) => prev.map((automation) => (automation.id === id ? { ...automation, status } : automation))); // Actualizar la automatización en el estado
        return update;
    };


    return (
        <AutomationContext.Provider value={{ automations, fetchAutomations, addAutomation, changeAutomationStatus }}>
            {children}
        </AutomationContext.Provider>
    );
}