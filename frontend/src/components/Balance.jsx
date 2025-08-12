import { useEffect, useState } from "react";
import axios from "axios";

export const Balance = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        };
        fetchBalance();
    }, []);

    if (loading) {
        return (
            <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-6 text-white shadow-lg">
                <div className="animate-pulse">
                    <div className="h-6 bg-white bg-opacity-30 rounded w-32 mb-2"></div>
                    <div className="h-8 bg-white bg-opacity-30 rounded w-48"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm font-medium opacity-90">
                        Your Balance
                    </div>
                    <div className="text-3xl font-bold">
                        ₹ {balance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </div>
                </div>
                <div className="text-4xl opacity-80">
                    💰
                </div>
            </div>
        </div>
    );
};