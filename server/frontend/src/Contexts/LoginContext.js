import React from "react";
const LoginContext = React.createContext({
    loggedIn: false,
    setLoggedIn: () => {},
});

export default LoginContext;
