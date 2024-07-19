import React from "react";
import useLogin from "../hooks/useLogin";
import {useState} from "react";

const LoginPage = () => {
    const loginPageStyles={
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
    const {login} = useLogin();

    const handleSubmit = ()=>{
        const validation = true;
        if(validation) {
            login({email,password});
        }else{
            alert("validation Failed");
        }
    }

    return (
        <div style={loginPageStyles}>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleSubmit}>Login</button>
        </div>
    )
}

export default LoginPage;