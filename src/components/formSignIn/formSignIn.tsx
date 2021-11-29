import { ChangeEvent, FocusEvent, useContext, useEffect, useState } from "react";
import { usersAuthorisation } from "@/services/dataService";
import { IContext, PropsForm } from "@/types/types";
import { AuthContext } from "../context/context";

const FormSignIn = ({ onSubmit }: PropsForm) => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginDirty, setLoginDirty] = useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = useState<boolean>(false);

  const [loginDirtyErr, setLoginDirtyErr] = useState<string>("логин не м б пустым");
  const [passwordDirtyErr, setPasswordDirtyErr] = useState<string>("пароль не м б пустым");

  const [formValid, setFormValid] = useState<boolean>(false);
  const [data, setData] = useState({
    login,
    password,
  });

  const { authLogIn, authLogOut } = useContext<IContext>(AuthContext);

  useEffect(() => {
    //localStorage.setItem("login", JSON.stringify(login));
    // localStorage.setItem("password", JSON.stringify(password));
    setData({ login, password });
    console.log(data);
  }, [login, password]);

  const handleSubmitForm = () => {
    usersAuthorisation("/api/auth/signIn", data)
      .then((res) => {
        if (res.ok) {
          authLogIn(data);
          console.log(res);
        } else {
          authLogOut();
        }
      })
      .then(onSubmit);
  };

  useEffect(() => {
    if (loginDirtyErr || passwordDirtyErr) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [loginDirtyErr, passwordDirtyErr]);

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const loginValue = e.target.value;
    setLogin(loginValue);
    if (!/^[a-zA-Z1-9]+$/.test(loginValue)) {
      setLoginDirtyErr("В логине должны быть латинские буквы/цифры");
    } else if (loginValue.length < 4 || loginValue.length > 20) {
      setLoginDirtyErr("В логине должен быть от 4 до 20 символов");
    } else if (parseInt(loginValue.substr(0, 1), 10)) {
      setLoginDirtyErr("Логин должен начинаться с буквы");
    } else if (!loginValue) {
      setLoginDirtyErr("Логин не может быть пустым");
    } else {
      setLoginDirtyErr("");
    }
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 20) {
      setPasswordDirtyErr("В пароле должно быть от 4 до 20 символов");
      if (!e.target.value) {
        setPasswordDirtyErr("Пароль не может быть пустым");
      }
    } else {
      setPasswordDirtyErr("");
    }
  };

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "login":
        setLoginDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="form">
      <div className="form-group">
        <label htmlFor="login">
          Login
          {loginDirty ? <div style={{ color: "red", fontSize: "13px" }}>{loginDirtyErr}</div> : null}
          <input
            className="input-form"
            value={login}
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => handleChangeLogin(e)}
            type="text"
            name="login"
            placeholder="login..."
          />
        </label>
        <label htmlFor="password">
          Password
          {passwordDirty ? <div style={{ color: "red", fontSize: "13px" }}>{passwordDirtyErr}</div> : null}
          <input
            className="input-form"
            value={password}
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => handleChangePassword(e)}
            type="text"
            name="password"
            placeholder="password..."
          />
        </label>
        <div className="padding-btn">
          <button type="button" disabled={!formValid} className="modal-btn" onClick={handleSubmitForm}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormSignIn;
