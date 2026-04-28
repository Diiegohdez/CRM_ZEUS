
export default function Toast({ message, type }) {
    // Colores para los diferentes tipos de toast
    const color = {
        success: "bg-green-700",
        error: "bg-red-700",
    }

    return (
        // Contenedor del toast con estilos y animación
        <div className={`flex items-center gap-3 text-white px-6 py-4 rounded-xl shadow-lg animate-slideIn ${color[type]}`}>
            <span className="text-xl">
                {type === "success" ? "✔" : "✖"}
            </span>

            <p className="font-medium">
                {message}
            </p>
        </div>
    );
}