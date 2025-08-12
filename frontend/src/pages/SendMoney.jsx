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
                }, 2000);
            }
        } catch (error) {
            setError(error.response?.data?.message || "Transfer failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-50 to-blue-50">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full mx-4">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold text-green-600 mb-2">Transfer Successful!</h2>
                    <p className="text-gray-600 mb-4">
                        ₹{amount} has been sent to {name}
                    </p>
                    <div className="text-sm text-gray-500">
                        Redirecting to dashboard...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
                <div className="text-center mb-8">
                    <div className="text-4xl mb-4">💸</div>
                    <h2 className="text-3xl font-bold text-gray-800">Send Money</h2>
                    <p className="text-gray-600 mt-2">Transfer funds securely</p>
                </div>

                <div className="mb-8">
                    <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                            {name ? name[0].toUpperCase() : "U"}
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                            <p className="text-sm text-gray-500">Recipient</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amount (in ₹)
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                                setError("");
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                            placeholder="Enter amount"
                            min="1"
                            step="0.01"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <Button
                            onClick={handleTransfer}
                            label="Initiate Transfer"
                            variant="success"
                            loading={loading}
                            disabled={!amount || parseFloat(amount) <= 0}
                        />
                        
                        <Button
                            onClick={() => navigate("/dashboard")}
                            label="Cancel"
                            variant="secondary"
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};