import { useEffect, useState } from "react";
import axios from "axios";

export const Balance = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    });
                    setBalance(response.data.balance);
                }
            } catch (error) {
                console.error("Error fetching balance:", error);
                setError("Failed to load balance");
            } finally {
                setLoading(false);
            }
        };
        fetchBalance();
    }, []);

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="animate-pulse">
                    <div className="h-6 bg-white bg-opacity-30 rounded-lg w-32 mb-3"></div>
                    <div className="h-10 bg-white bg-opacity-30 rounded-lg w-48"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium opacity-90">
                            Balance Error
                        </div>
                        <div className="text-lg font-bold">
                            {error}
                        </div>
                    </div>
                    <div className="text-4xl opacity-80">
                        ⚠️
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm font-medium opacity-90 mb-2">
                        Your Balance
                    </div>
                    <div className="text-4xl font-bold mb-1">
                        ₹ {balance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm opacity-75">
                        Available to spend
                    </div>
                </div>
                <div className="text-5xl opacity-80">
                    💰
                </div>
            </div>
        </div>
    );
};