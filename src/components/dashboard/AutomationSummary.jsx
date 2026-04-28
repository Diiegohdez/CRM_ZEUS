

export default function AutomationSummary({ automations }) {

    // Calcular el número de automatizaciones pendientes, completadas y vencidas
    const pending = automations.filter(a => a.status === "pendiente").length;

    const completed = automations.filter(a => a.status === "completado").length;

    const overdue = automations.filter((a) => a.status === "pendiente" && new Date(a.due_date) < new Date()).length;

    return (
        <div className="bg-[#1F2937] p-2 rounded-2xl shadow-2xl h-full">
            <h2 className="text-xl text-center text-white font-bold mb-2">
                Resumen de Automatizaciones
            </h2>

            <div className="flex flex-col gap-4 h-[190px] justify-center">
                <div className="flex justify-between items-center bg-yellow-500/10 p-3 rounded-2xl">
                    <span className="text-yellow-400 font-medium">
                        Pendientes
                    </span>
                    <span className="text-white font-bold">
                        {pending}
                    </span>
                </div>

                <div className="flex justify-between items-center bg-green-500/10 p-3 rounded-2xl">
                    <span className="text-green-400 font-medium">
                        Completadas
                    </span>
                    <span className="text-white font-bold">
                        {completed}
                    </span>
                </div>

                <div className="flex justify-between items-center bg-red-500/10 rounded-2xl">
                    <span className="text-red-400 font-medium">
                        Vencidas
                    </span>
                    <span>
                        {overdue > 0 ? (
                            <div className="relative rounded-xl text-sm font-medium text-center">
                                ⚠ Tienes {overdue} tarea{overdue > 1 ? "s" : ""} vencida{overdue > 1 ? "s" : ""}
                            </div>
                        ) : (
                            <div className="bg-green-500/10 text-green-400 p-2 rounded-xl mb-4 text-sm font-medium mt-3">
                                ✔ No hay tareas vencidas
                            </div>
                        )}
                    </span>
                </div>
            </div>
        </div>
    )
}