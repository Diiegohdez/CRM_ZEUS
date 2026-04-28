import { useEffect } from "react";
import { useAutomation } from "../context/AutomationContext";

export default function Clients() {

    // Obtener las funciones y el estado de las automatizaciones desde el contexto
    const { fetchAutomations, automations, changeAutomationStatus } = useAutomation();

    // Cargar las automatizaciones al montar el componente
    useEffect(() => {
        fetchAutomations();
    }, []);


    return (
        <div className="p-6 text-white">
            <h1 className="text-2xl font-bold text-[#A9DFD8] mb-6">
                Automatizaciones
            </h1>

            <div className="bg-[#1F2937] rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-700">
                            <th className="p-4 text-left">Cliente</th>
                            <th className="p-4 text-left">Tarea</th>
                            <th className="p-4 text-left">Fecha</th>
                            <th className="p-4 text-left">Estado</th>
                            <th className="p-4 text-left">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {automations.map((item) => (
                            <tr key={item.id} className="border-b border-gray-800">
                                <td className="p-4">{item.clients?.name}</td>

                                <td className="p-4">{item.task}</td>

                                <td className="p-4">
                                    {new Date(item.due_date).toLocaleDateString()}
                                </td>

                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "pendiente"
                                                ? "bg-yellow-500/20 text-yellow-400"
                                                : "bg-green-500/20 text-green-400"
                                            }`}
                                    >
                                        {item.status === "pendiente" ? "Pendiente" : "Completado"}
                                    </span>
                                </td>

                                <td className="p-4">
                                    {item.status === "pendiente" ? (
                                        <button
                                            onClick={() => changeAutomationStatus(item.id, "completado")}
                                            className="px-3 py-1 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition"
                                        >
                                            Completar
                                        </button>
                                    ) : (
                                        <span className="text-gray-400 font-medium">
                                            ✔ Finalizado
                                        </span>
                                    )}
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}