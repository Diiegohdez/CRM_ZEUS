import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'; // Importar el proveedor de contexto para la autenticación
import { ToastProvider } from './components/toast/ToastProvider.jsx'; // Importar el proveedor de contexto para las notificaciones
import { ClientsProvider } from './context/ClientsContext.jsx'; // Importar el proveedor de contexto para los clientes
import { BrowserRouter } from "react-router-dom"; // Importar el proveedor de contexto para el enrutamiento
import { AutomationProvider } from './context/AutomationContext.jsx';

createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <BrowserRouter>
      <ClientsProvider>
        <ToastProvider>
          <AutomationProvider>
            <StrictMode>
              <App />
            </StrictMode>
          </AutomationProvider>
        </ToastProvider>
      </ClientsProvider>
    </BrowserRouter>
  </AuthProvider>
)
