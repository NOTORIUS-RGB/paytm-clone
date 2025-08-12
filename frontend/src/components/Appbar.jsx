import { useEffect, useState } from "react";
import axios from "axios";

export const Appbar = () => {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await axios.get("http://localhost:3000/api/v1/user/me", {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    });
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                localStorage.removeItem("token");
                window.location.href = "/signin";
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/signin";
    };

    return (
        <div className="shadow-lg h-16 flex justify-between items-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-6">
            <div className="flex items-center">
                <div className="text-white text-2xl font-bold flex items-center">
                    <span className="text-3xl mr-2">💳</span>
                    PayTM
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-white text-sm font-medium">
                    Hello, {user ? user.firstName : "User"}
                </div>
                <div className="relative">
                    <div 
                        className="rounded-full h-10 w-10 bg-white bg-opacity-20 backdrop-blur-sm flex justify-center items-center cursor-pointer hover:bg-opacity-30 transition-all duration-200 border-2 border-white border-opacity-30"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <div className="text-white text-lg font-semibold">
                            {user ? user.firstName[0].toUpperCase() : "U"}
                        </div>
                    </div>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-200">
                            <div className="py-2">
                                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                                    <div className="font-medium">{user?.firstName} {user?.lastName}</div>
                                    <div className="text-gray-500">{user?.username}</div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <span className="mr-2">🚪</span>
                                    Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};