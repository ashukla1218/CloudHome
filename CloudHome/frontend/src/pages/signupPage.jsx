import { useState } from "react";
import useSignup from "../hooks/useSignup";
import Navbar from "../components/navbar";

const SignupPage = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup } = useSignup();

    const handleSubmit = () => {
        const validation = true;
        if (validation) {
            signup({ name,email, password });
        } else {
            alert("Validation Failed");
        }
    };

    return (
        <>
        <Navbar />
        <div className="auth-page-wrapper">
                <div className="signup-container">
                    <h1>Signup</h1>
                    <input className="signup-input" placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input className="signup-input" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="signup-input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="signup-button" onClick={handleSubmit}>Sign Up</button>
                    <div className="login-link">Already have an account? <a href="/login">Login</a></div>
                </div>
            </div>
        </>
    );
};

export default SignupPage;
