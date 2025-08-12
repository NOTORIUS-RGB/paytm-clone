import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
    return (
        <div className="py-4 text-sm flex justify-center text-gray-600">
            <div>
                {label}
            </div>
            <Link 
                className="pointer underline pl-1 cursor-pointer text-blue-600 hover:text-blue-800 font-medium" 
                to={to}
            >
                {buttonText}
            </Link>
        </div>
    );
}