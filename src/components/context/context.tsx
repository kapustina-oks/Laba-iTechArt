import { createContext, FC, useState } from "react";
import { IContext } from "@/types/types";

export const AuthContext = createContext<IContext>({} as IContext);

export const Auth: FC = (props) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("User name");

  const authLogIn = (user: { login: string }) => {
    setAuth(true);
    setUserName(user.login);
  };

  const authLogOut = () => {
    setAuth(false);
    localStorage.clear();
  };

  const value = {
    auth,
    userName,
    authLogIn,
    authLogOut,
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
