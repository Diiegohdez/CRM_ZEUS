import { useState } from "react";
import { useAutomation } from "../../context/AutomationContext";
import { CiBellOn } from "react-icons/ci";
export default function NotificationsMenu() {

    const [open, setOpen] = useState(false); // Estado para controlar si el menú de notificaciones está abierto o cerrado
    const { automations } = useAutomation(); // Obtener las automatizaciones desde el contexto de automatización

    const today = new Date(); // Obtener la fecha actual

    const notifications = automations.map((a) => {
        const due = new Date(a.due_date); // Convertir la fecha de vencimiento de la automatización a un objeto Date

        if (a.status === "completo") return null; // Si la automatización está completa, no se muestra en las notificaciones

        if (due < today) {
            return {
                type: "overdue", // Tipo de notificación para automatizaciones vencidas
                text: `⚠ ${a.clients?.name} → tarea vencida`,
            };
        }

        if (due.toDateString() === today.toDateString()) {
            return {
                type: "due-today", // Tipo de notificación para automatizaciones que vencen hoy
                text: `⏰ ${a.clients?.name} → tarea vence hoy`,
            };
        }

        return {
            type: "upcoming", // Tipo de notificación para automatizaciones próximas a vencer
            text: `🟡 ${a.clients?.name} → pendiente`,
        }
    }).filter(Boolean); // Filtrar las notificaciones para eliminar las que son null (automatizaciones completas)

    return (
        <div className="relative">
            {/* Icono de campana para abrir el menú de notificaciones */}
            <button onClick={() => setOpen(!open)} className="relative text-gray-300 hover:text-white mt-1 mr-2">
                <CiBellOn size={23} />

                {/* contador */}
                {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500  text-xs rounded-full px-1 ">
                        {notifications.length}
                    </span>
                )}
            </button>

            {/*  DROPDOWN  */}
            {open && (
                <div className="absolute right-0 mt-2 w-72 bg-[#1F2937] rounded-xl shadow-lg border border-gray-700 z-50 max-h-80 overflow-y-auto">
                    <div className="p-3 border-b border-gray-700 text-sm font-semibold text-white">
                        Notificaciones
                    </div>
                    {notifications.length === 0 ? (
                        <p className="p-4 text-gray-400 text-sm">
                            No hay notificaciones
                        </p>
                    ) : (
                        notifications.map((notification, index) => (
                            <div key={index} className="px-4 py-3 text-sm text-gray-300 border-b border-gray-800 hover:bg-[#374151]">
                                {notification.text}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}   