

export default function ModalDelete({ isOpen,onClose, onConfirm }) {
    
    // Si el modal no está abierto, no renderizar nada
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#1F2937] p-6 rounded-2xl w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">
                    Eliminar Cliente
                </h2>

                <p className="text-gray-400 mb-6">
                    ¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.
                </p>

                <div className="flex justify-end gap-3">
                    {/* Botón para cancelar la eliminación y cerrar el modal */}
                    <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600">
                        Cancelar
                    </button>

                    {/* Botón para confirmar la eliminación del cliente */}
                    <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}