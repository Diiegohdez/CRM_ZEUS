

export default function StatsCards({ stats}) {


        const cards = [
        { label: "Total Clientes", value: stats.total, color: "text-white" },
        { label: "Leads", value: stats.leads, color: "text-blue-400" },
        { label: "Clientes", value: stats.customers, color: "text-yellow-400" },
        { label: "Contactados", value: stats.contacted, color: "text-purple-400" },
    ];

    return (
        // Tarjetas de estadísticas para mostrar información clave como el total de clientes, leads, etc.
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {cards.map((card, i) => (
                <div
                    key={i}
                    className="bg-[#1F2937] p-4 rounded-xl opacity-0 animate-card"
                    style={{ animationDelay: `${i * 0.1}s` }}
                >
                    <p className="text-gray-400 text-sm">{card.label}</p>
                    <h2 className={`text-2xl font-bold ${card.color}`}>
                        {card.value}
                    </h2>
                </div>
            ))}
        </div>
    );
}