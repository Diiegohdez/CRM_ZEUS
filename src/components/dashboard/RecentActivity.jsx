

export default function RecentActivity({ clients}) {

    // Calcular los clientes más recientes ordenando por fecha de creación y tomando los primeros 5
    const recentClients = [...clients]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

    // Función para calcular el tiempo transcurrido desde una fecha dada y devolver una cadena legible como "Hace 5 minutos", "Hace 2 horas", etc.
    const timeAgo = (date) => {
        const diff = Math.floor((new Date() - new Date(date)) / 1000);

        if (diff < 60) return "Hace unos segundos";
        if (diff < 3600) return `Hace ${Math.floor(diff / 60)} minutos`;
        if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} horas`;
        return `Hace ${Math.floor(diff / 86400)} días`;
    };

    return (
        <div className="bg-[#1F2937] p-6 rounded-2xl shadow-2xl">
            <h2 className=" text-xl text-white font-bold mb-4 flex justify-center">
                Actividad Reciente
            </h2>

            <div className="space-y-4">
                {/* Renderizar la lista de clientes más recientes mostrando su nombre, email y el tiempo transcurrido desde su creación */}
                {recentClients.map(client => (
                    <div key={client.id} className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <div>
                            <p className="text-white font-medium">
                                {client.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                                {client.email}
                            </p>
                        </div>
                        <span className="text-gray-500 text-sm">
                            {timeAgo(client.created_at)}
                        </span>
                    </div>
                ))}

            </div>
        </div>
    );

}
