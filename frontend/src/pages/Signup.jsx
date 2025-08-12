import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!firstName || !lastName || !username || !password) {
            setError("Please fill in all fields");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password
            });

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            setError(error.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-purple-50 to-blue-100 min-h-screen flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="text-4xl mb-4">🚀</div>
                    <Heading label="Join PayTM" />
                    <SubHeading label="Enter your information to create an account" />
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <InputBox 
                        onChange={(e) => setFirstName(e.target.value)} 
                        placeholder="John" 
                        label="First Name"
                        value={firstName}
                    />
                    <InputBox 
                        onChange={(e) => setLastName(e.target.value)} 
                        placeholder="Doe" 
                        label="Last Name"
                        value={lastName}
                    />
                    <InputBox 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="john@example.com" 
                        label="Email"
                        type="email"
                        value={username}
                    />
                    <InputBox 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Create a strong password" 
                        label="Password"
                        type="password"
                        value={password}
                    />
                    
                    <div className="pt-4">
                        <Button 
                            onClick={handleSignup} 
                            label="Create Account"
                            loading={loading}
                            disabled={!firstName || !lastName || !username || !password}
                        />
                    </div>
                </div>

                <BottomWarning 
                    label="Already have an account?" 
                    buttonText="Sign in" 
                    to="/signin" 
                />
            </div>
        </div>
    );
};