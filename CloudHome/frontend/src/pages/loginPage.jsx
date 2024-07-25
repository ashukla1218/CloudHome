import { useState } from "react";
import useLogin from "../hooks/useLogin";
import Navbar from "../components/navbar";

const LoginPage = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useLogin();

    const handleSubmit = () => {
        const validation = true;
        if (validation) {
            login({ email, password });
        } else {
            alert("Validation Failed");
        }
    };

    return (
        <>
        <Navbar />
        <div className="auth-page-wrapper">
                <div className="login-container">
                    <h1>Login</h1>
                    <input className="login-input" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="login-input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="login-button" onClick={handleSubmit}>Login</button>
                    <div className="signup-link">Don't have an account? <a href="/signup">Signup</a></div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
