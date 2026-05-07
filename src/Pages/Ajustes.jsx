import { useState, useEffect, use } from "react";

export default function Ajustes() {

    // Estado para controlar si las notificaciones están habilitadas o no
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    // Estado para controlar si las animaciones están habilitadas o no
    const [animationEnabled, setAnimationEnabled] = useState(false);

    //Guarda el estado de las notificaciones y las animaciones en localStorage cada vez que cambien
    useEffect(() => {
        localStorage.setItem("notificationsEnabled", JSON.stringify(notificationsEnabled)); // Guardar el estado de las notificaciones en localStorage

        localStorage.setItem("animationEnabled", JSON.stringify(animationEnabled)); // Guardar el estado de las animaciones en localStorage
    }, [notificationsEnabled, animationEnabled]); // Ejecutar el efecto cada vez que cambie el estado de las notificaciones o las animaciones

    useEffect(() => {
        const storedNotificationsEnabled = localStorage.getItem("notificationsEnabled"); // Obtener el estado de las notificaciones desde localStorage

        const storedAnimationEnabled = localStorage.getItem("animationEnabled"); // Obtener el estado de las animaciones desde localStorage

        if (storedNotificationsEnabled !== null) {
            setNotificationsEnabled(JSON.parse(storedNotificationsEnabled)); // Actualizar el estado de las notificaciones con el valor almacenado en localStorage
        }
        if (storedAnimationEnabled !== null) {
            setAnimationEnabled(JSON.parse(storedAnimationEnabled)); // Actualizar el estado de las animaciones con el valor almacenado en localStorage
        }
    }, []);

    return (
        <div className="p-6 text-white max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-[#A9DFD8] mb-6">
                Ajustes
            </h1>

            {/* PREFERENCIAS */}
            <div className="bg-[#1F2937] p-6 rounded-2xl shadow-lg mb-6">
                <h2 className="text-lg font-semibold mb-4">
                    Preferencias
                </h2>

                <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-300">
                        Mostrar notificaciones vencidas
                    </span>
                    <input
                        type="checkbox"
                        checked={notificationsEnabled}
                        onChange={() => setNotificationsEnabled(!notificationsEnabled)} // Cambiar el estado de las notificaciones al hacer clic en el checkbox
                        className="w-5 h-5 accent-[#A9DFD8]"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-300">
                        Animaciones activas
                    </span>
                    <input
                        type="checkbox"
                        checked={animationEnabled}
                        onChange={() => setAnimationEnabled(!animationEnabled)} // Cambiar el estado de las animaciones al hacer clic en el checkbox
                        className="w-5 h-5 accent-[#A9DFD8]"
                    />
                </div>
            </div>


            {/* INFORMACIÓN */}
            <div className="bg-[#1F2937] p-6 rounded-2xl shadow-lg">
                <h2 className="text-lg font-semibold mb-4">
                    Información del Sistema
                </h2>

                <div className="space-y-2 text-gray-300">
                    <p>
                        <span className="text-gray-400">
                            Aplicación:
                        </span>{" "}
                        CRM Dashboard
                    </p>

                    <p>
                        <span className="text-gray-400">
                            Versión:
                        </span>{" "}
                        v1.0
                    </p>

                    <p>
                        <span className="text-gray-400">
                            Tecnologías:
                        </span>{" "}
                        React + Tailwind + Supabase
                    </p>
                </div>
            </div>
        </div>
    );
}