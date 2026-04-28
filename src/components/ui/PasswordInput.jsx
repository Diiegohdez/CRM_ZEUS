import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordInput({
    value,
    onChange,
    name = "password",
    placeholder = "Contraseña",
    className = "",
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative w-full">
            <input
                type={showPassword ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`${className} pr-10`}
            />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-6 -translate-y-1/2 text-gray-400 hover:text-[#A9DFD8]"
            >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
        </div>
    );
}