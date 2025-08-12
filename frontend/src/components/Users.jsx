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
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <div className="flex items-center mb-6">
                <div className="text-2xl mr-3">👥</div>
                <div className="font-bold text-xl text-gray-800">
                    Send Money
                </div>
            </div>
            
            <div className="mb-6">
                <input 
                    onChange={(e) => setFilter(e.target.value)}
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
            </div>

            <div className="space-y-3">
                {loading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className="rounded-full h-12 w-12 bg-gray-300"></div>
                                    <div className="ml-4">
                                        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                                        <div className="h-3 bg-gray-300 rounded w-24"></div>
                                    </div>
                                </div>
                                <div className="h-10 bg-gray-300 rounded w-24"></div>
                            </div>
                        ))}
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-2">🔍</div>
                        <div>No users found</div>
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
        <div className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 border border-gray-100">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-gradient-to-r from-blue-400 to-purple-500 flex justify-center items-center text-white font-semibold text-lg shadow-md">
                    {user.firstName[0].toUpperCase()}
                </div>
                <div className="ml-4">
                    <div className="font-semibold text-gray-800">
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                        {user.username}
                    </div>
                </div>
            </div>

            <div className="w-32">
                <Button 
                    onClick={() => {
                        navigate(`/send?id=${user._id}&name=${user.firstName}`);
                    }} 
                    label="Send Money"
                    variant="success"
                />
            </div>
        </div>
    );
}