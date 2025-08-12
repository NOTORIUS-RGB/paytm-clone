import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            <Appbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">Dashboard</h1>
                    <p className="text-gray-600 text-lg">Manage your account and send money securely</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <Balance />
                        
                        {/* Quick Stats */}
                        <div className="mt-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Account Status</span>
                                    <span className="text-green-600 font-medium">✅ Active</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Security</span>
                                    <span className="text-green-600 font-medium">🔒 Secured</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <Users />
                    </div>
                </div>
            </div>
        </div>
    );
};