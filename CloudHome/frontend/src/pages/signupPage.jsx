import React from "react";
import useSignup from "../hooks/useSignup";
import {useState} from "react";

const SignupPage = () => {
    const signupPageStyles={
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        margin: "auto",
        padding: "24px",
    };
    
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {signup} = useSignup();

    const handleSubmit = ()=>{
        const validation = true;
        if(validation) {
            signup({email,password});
        }else{
            alert("validation Failed");
        }
    }

    return (
        <div style={signupPageStyles}>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleSubmit}>Signup</button>
        </div>
    )
}

export default SignupPage;