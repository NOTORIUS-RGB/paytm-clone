import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { Button } from '../components/Button';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleTransfer = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount: parseFloat(amount)
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            if (response.data.message === "Transfer successful") {
                setSuccess(true);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || "Transfer failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
                <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md w-full mx-4 border border-green-100">
                    <div className="text-8xl mb-6 animate-bounce">✅</div>
                    <h2 className="text-3xl font-bold text-green-600 mb-4">Transfer Successful!</h2>
                    <p className="text-gray-600 mb-6 text-lg">
                        ₹{parseFloat(amount).toLocaleString('en-IN')} has been sent to <span className="font-semibold">{name}</span>
                    </p>
                    <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                        Redirecting to dashboard in 3 seconds...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 border border-gray-100">
                <div className="text-center mb-10">
                    <div className="text-6xl mb-6">💸</div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Send Money</h2>
                    <p className="text-gray-600 text-lg">Transfer funds securely and instantly</p>
                </div>

                <div className="mb-10">
                    <div className="flex items-center p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                            {name ? name[0].toUpperCase() : "U"}
                        </div>
                        <div className="ml-6">
                            <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
                            <p className="text-sm text-gray-500 font-medium">Recipient</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                            Amount (in ₹)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">₹</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    setError("");
                                }}
                                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-xl font-semibold"
                                placeholder="0.00"
                                min="1"
                                step="0.01"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-6 py-4 rounded-lg">
                            <div className="flex items-center">
                                <span className="text-xl mr-2">⚠️</span>
                                {error}
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <Button
                            onClick={handleTransfer}
                            label="Initiate Transfer"
                            variant="success"
                            loading={loading}
                            disabled={!amount || parseFloat(amount) <= 0}
                            size="lg"
                        />
                        
                        <Button
                            onClick={() => navigate("/dashboard")}
                            label="Cancel"
                            variant="secondary"
                            disabled={loading}
                            size="lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};