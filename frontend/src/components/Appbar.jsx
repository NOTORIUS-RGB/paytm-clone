import { useEffect, useState } from "react";
import axios from "axios";

export const Appbar = () => {
    const [user, setUser] = useState(null);

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
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/signin";
    };

    return (
        <div className="shadow-lg h-16 flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 px-6">
            <div className="flex items-center">
                <div className="text-white text-2xl font-bold">
                    💳 PayTM
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-white text-sm">
                    Hello, {user ? user.firstName : "User"}
                </div>
                <div className="relative group">
                    <div className="rounded-full h-10 w-10 bg-white bg-opacity-20 backdrop-blur-sm flex justify-center items-center cursor-pointer hover:bg-opacity-30 transition-all duration-200">
                        <div className="text-white text-lg font-semibold">
                            {user ? user.firstName[0].toUpperCase() : "U"}
                        </div>
                    </div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        <div className="py-1">
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};