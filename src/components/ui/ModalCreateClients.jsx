

export default function ModalCreateClients({ isOpen, onClose, children }) {
    // Si el modal no está abierto, no renderizar nada
    if (!isOpen) return null;

    return (
        <div className=" fixed inset-0 z-50 flex items-center justify-center">
            {/* Fondo oscuro semitransparente */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            {/* Contenido del modal */}
            <div className="relative z-10 w-full max-w-3xl mx-4">
                {children}
            </div>
        </div>
    );
}