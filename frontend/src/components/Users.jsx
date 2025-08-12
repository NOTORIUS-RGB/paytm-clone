import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    });
                    setUsers(response.data.user || []);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchUsers, 300);
        return () => clearTimeout(debounceTimer);
    }, [filter]);

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-8">
                <div className="text-3xl mr-4">👥</div>
                <div>
                    <div className="font-bold text-2xl text-gray-800">
                        Send Money
                    </div>
                    <div className="text-gray-500 text-sm">
                        Search and send money to your contacts
                    </div>
                </div>
            </div>
            
            <div className="mb-8">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-lg">🔍</span>
                    </div>
                    <input 
                        onChange={(e) => setFilter(e.target.value)}
                        type="text" 
                        placeholder="Search users by name..." 
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                    />
                </div>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                                <div className="flex items-center">
                                    <div className="rounded-full h-14 w-14 bg-gray-300"></div>
                                    <div className="ml-4">
                                        <div className="h-5 bg-gray-300 rounded-lg w-32 mb-2"></div>
                                        <div className="h-4 bg-gray-300 rounded-lg w-24"></div>
                                    </div>
                                </div>
                                <div className="h-12 bg-gray-300 rounded-xl w-32"></div>
                            </div>
                        ))}
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <div className="text-6xl mb-4">🔍</div>
                        <div className="text-xl font-medium mb-2">No users found</div>
                        <div className="text-gray-400">Try searching with a different name</div>
                    </div>
                ) : (
                    users.map(user => <User key={user._id} user={user} />)
                )}
            </div>
        </div>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center p-6 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-md">
            <div className="flex items-center">
                <div className="rounded-full h-14 w-14 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 flex justify-center items-center text-white font-bold text-xl shadow-lg">
                    {user.firstName[0].toUpperCase()}
                </div>
                <div className="ml-4">
                    <div className="font-semibold text-gray-800 text-lg">
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                        {user.username}
                    </div>
                </div>
            </div>

            <div className="w-36">
                <Button 
                    onClick={() => {
                        navigate(`/send?id=${user._id}&name=${user.firstName}`);
                    }} 
                    label="Send Money"
                    variant="success"
                    size="sm"
                />
            </div>
        </div>
    );
}