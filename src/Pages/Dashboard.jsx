import { useEffect } from "react";
import { useClients } from "../context/ClientsContext";
import ClientsChart from "../components/dashboard/ClientsChart";
import StatsCards from "../components/dashboard/StatsCards";
import RecentActivity from "../components/dashboard/RecentActivity";
import ClientsBarChart from "../components/dashboard/ClientsBarChart";
import AutomationSummary from "../components/dashboard/AutomationSummary";
import { useAutomation } from "../context/AutomationContext";

export default function Dashboard() {

    // Obtener la lista de clientes desde el contexto utilizando el hook personalizado
    const { clients, fetchClients, loading } = useClients();

    // Obtener la lista de automatizaciones desde el contexto utilizando el hook personalizado
    const { automations } = useAutomation();

    // Calcular las estadísticas clave para mostrar en las tarjetas, como el total de clientes, leads, clientes y contactados
    const stats = {
        total: clients.length,
        leads: clients.filter(c => c.status === "lead").length,
        customers: clients.filter(c => c.status === "customer").length,
        contacted: clients.filter(c => c.status === "contactado").length
    };

    // Datos para el gráfico de clientes, mostrando la distribución de leads, clientes y contactados
    const chartData = [
        { name: "Leads", value: stats.leads, fill: "#3B82F6" },
        { name: "Clientes", value: stats.customers, fill: "#FACC15" },
        { name: "Contactados", value: stats.contacted, fill: "#A855F7" },
    ];

    useEffect(() => {
        // Al montar el componente, llamar a la función para obtener la lista de clientes y actualizar el estado en el contexto
        fetchClients();
    }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente


    if (loading) {
        return (
            <div className="p-6 animate-pulse space-y-6 ">

                {/* Cards */}
                <div className="grid grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-20 bg-gray-700 rounded-xl"></div>
                    ))}
                </div>

                {/* Gráficas */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="h-64 bg-gray-700 rounded-xl"></div>
                    <div className="h-64 bg-gray-700 rounded-xl"></div>
                </div>

            </div>
        );
    }
    return (
        <div className="p-2 animate-fadeIn">
            {/* Renderizar las tarjetas de estadísticas pasando los datos calculados */}
            <StatsCards stats={stats} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Renderizar el gráfico de clientes pasando los datos para mostrar la distribución */}
                <ClientsChart clients={chartData} />

                {/* Renderizar la sección de actividad reciente pasando la lista de clientes */}
                <div>
                    <h2 className="text-white font-bold">
                        <RecentActivity clients={clients} />
                    </h2>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Renderizar el gráfico de barras para mostrar la distribución de clientes por estado */}
                <ClientsBarChart clients={chartData} />
                {/* Renderizar el resumen de automatizaciones */}
                <AutomationSummary automations={automations} />
            </div>
        </div>
    );

}