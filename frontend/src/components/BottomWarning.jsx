import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
    return (
        <div className="py-6 text-base flex justify-center text-gray-600">
            <div>
                {label}
            </div>
            <Link 
                className="pointer underline pl-2 cursor-pointer text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200" 
                to={to}
            >
                {buttonText}
            </Link>
        </div>
    );
}