import { CiSearch, CiBellOn } from "react-icons/ci";
import UserMenu from "../ui/dropdown";
import NotificationsMenu from "../ui/NotificationsMenu";

export default function Topbar() {

    return (
        <header className="h-16 bg-[#171821]  flex items-center justify-between px-6">

            {/* buscador */}
            <div className="flex items-center gap-2 bg-[#1F2937] px-4 py-2 rounded-lg w-96 ml-4">
                <CiSearch size={18} className="text-gray-400" />
                <input type="text" placeholder="Buscar..." className="bg-transparent focus:outline-none text-sm w-full text-gray-200" />
            </div>

            {/* acciones */}
            <div className="flex items-center gap-4">
                <NotificationsMenu />

                <UserMenu />
            </div>
        </header>
    );
}