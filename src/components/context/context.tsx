import { createContext, useState } from "react";

export const AuthContext = createContext();

export const Auth = (props) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("User name");

  const authLogIn = (user) => {
    setAuth(true);
    setUserName(user.login);
  };

  const authLogOut = () => {
    setAuth(false);
    localStorage.clear();
  };

  // const authLocalStorage = () => {
  //   const login = localStorage.getItem("login");
  //   if (login) {
  //     localStorage.setItem("userName", userName);
  //     setAuth(true);
  //     //setUserName(login);
  //   }
  // };

  const value = {
    auth,
    userName,
    authLogIn,
    authLogOut,
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
