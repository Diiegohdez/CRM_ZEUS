import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function ClientsChart({ clients }) {
    
    // Colores para las secciones del gráfico de pizza
    const COLORS = ["#3B82F6", "#FACC15", "#A855F7"];

    return (
        <div className="bg-[#1F2937] p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4 flex justify-center">
                Clientes por Estado
            </h2>

            {/* Gráfico de pizza para mostrar la distribución de clientes por estado */}
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={clients}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                    >
                        {clients.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}