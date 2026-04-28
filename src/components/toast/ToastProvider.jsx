import { createContext, useState, useContext } from "react";
import Toast from "./Toast";

// Crear el contexto para el Toast
export const ToastContext = createContext();

// Hook personalizado para usar el contexto del Toast
export function useToast() {
    return useContext(ToastContext);
}

// Componente proveedor para el Toast
export function ToastProvider({ children }) {
    const [toast, setToast] = useState([]);

    const showToast = (message, type = "success") => {

        const id = Date.now();
        // Agregar el nuevo toast al estado
        setToast((prev) => [...prev, { id, message, type }]);

        // Eliminar el toast después de 4 segundos
        setTimeout(() => {
            setToast((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    };

    // Funciones para mostrar toasts de éxito y error
    const sucess = (message) => showToast(message, "success");
    const errores = (message) => showToast(message, "error");

    return (
        <ToastContext.Provider value={{ sucess, errores }}>
            {children}
            {/* Contenedor para mostrar los toasts */}
            <div className="fixed top-6 right-6 flex flex-col gap-3 z-50">
                {toast.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}