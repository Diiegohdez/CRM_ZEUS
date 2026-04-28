import  Sidebar  from "./Sidebar";
import  TopBar  from "./Topbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    
    return (
        <div className="flex h-screen bg-[#171821] text-gray-200">
            {/* Barra lateral */}
            <Sidebar />

            <div className="flex flex-col flex-1">
                {/* TopBar */}
                <TopBar />

                <main className="flex-1 p-8 overflow-y-auto">
                    {/* Contenido principal */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}