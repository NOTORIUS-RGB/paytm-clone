import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignin = async () => {
        if (!username || !password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
            });

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            setError(error.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="text-4xl mb-4">💳</div>
                    <Heading label="Welcome Back" />
                    <SubHeading label="Enter your credentials to access your account" />
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <InputBox 
                        placeholder="john@example.com" 
                        label="Email" 
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputBox 
                        placeholder="Enter your password" 
                        label="Password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <div className="pt-4">
                        <Button 
                            label="Sign In" 
                            onClick={handleSignin}
                            loading={loading}
                            disabled={!username || !password}
                        />
                    </div>
                </div>

                <BottomWarning 
                    label="Don't have an account?" 
                    buttonText="Sign up" 
                    to="/signup" 
                />
            </div>
        </div>
    );
};