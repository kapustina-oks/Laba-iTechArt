import { createContext, FC, useState } from "react";
import { IContext } from "@/types/types";

export const AuthContext = createContext<IContext>({} as IContext);
interface IAuth {
  value: IContext;
}

export const Auth: FC<IAuth> = (props) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("User name");
  const [modal, setModal] = useState<boolean>(false);

  const authLogIn = (user: { login: string }) => {
    setAuth(true);
    setUserName(user.login);
  };

  const authLogOut = () => {
    setAuth(false);
    localStorage.clear();
  };

  const onOpenModal = () => {
    setModal(true);
  };

  const onCloseModal = () => {
    setModal(false);
  };

  const value = {
    auth,
    userName,
    modal,
    authLogIn,
    authLogOut,
    onOpenModal,
    onCloseModal,
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
