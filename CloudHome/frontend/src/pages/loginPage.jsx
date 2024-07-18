import React from "react";
const LoginPage = () => {
    const loginPageStyles={
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        margin: "auto",
        padding: "24px",
    } 

    return (
        <div>
        <input type="text" />
        <input type="password" />
        <button>Login</button>
        </div>
    )
};

export default LoginPage;