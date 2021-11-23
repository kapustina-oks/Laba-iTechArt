import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import {postResource} from "../../services/dataService";

const FormSignIn = ({ onSubmit }) => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginDirty, setLoginDirty] = useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
  const [loginDirtyErr, setLoginDirtyErr] = useState<string>("логин не м б пустым");
  const [passwordDirtyErr, setPasswordDirtyErr] = useState<string>("пароль не м б пустым");
  const [formValid, setFormValid] = useState<boolean>(false);
  const [data, setData] = useState({
    login: "",
    password: "",
  });

  useEffect(() => {
    localStorage.setItem("login", JSON.stringify(login));
    localStorage.setItem("password", JSON.stringify(password));
    setData({ login, password });
    postResource("/api/auth/signIn", data).then((res) => console.log(res));
    console.log(data);
  }, [login, password]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    console.log("data1");
    postResource("/api/auth/signIn", data).then((res) => console.log(res));
  };

  useEffect(() => {
    if (loginDirtyErr || passwordDirtyErr) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [loginDirtyErr, passwordDirtyErr]);

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const login = e.target.value;
    setLogin(login);
    if (!/^[a-zA-Z1-9]+$/.test(login)) {
      setLoginDirtyErr("В логине должны быть латинские буквы/цифры");
    } else if (login.length < 4 || login.length > 20) {
      setLoginDirtyErr("В логине должен быть от 4 до 20 символов");
    } else if (parseInt(login.substr(0, 1), 10)) {
      setLoginDirtyErr("Логине должен начинаться с буквы");
    } else if (!login) {
      setLoginDirtyErr("логин не м б пустым");
    } else {
      setLoginDirtyErr("");
    }
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 20) {
      setPasswordDirtyErr("некорректный пароль");
      if (!e.target.value) {
        setPasswordDirtyErr("пароль не м б пустым");
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
    }
  };

  return (
    <form className="form" onSubmit={handleSubmitForm}>
      <div className="form-group">
        <label htmlFor="login">Login</label>
        {loginDirty ? <div style={{ color: "red" }}>{loginDirtyErr}</div> : null}
        <input
          className="input-form"
          value={login}
          onBlur={(e) => blurHandler(e)}
          onChange={(e) => handleChangeLogin(e)}
          type="text"
          name="login"
          placeholder="login..."
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        {passwordDirty ? <div style={{ color: "red" }}>{passwordDirtyErr}</div> : null}
        <input
          className="input-form"
          value={password}
          onBlur={(e) => blurHandler(e)}
          onChange={(e) => handleChangePassword(e)}
          type="text"
          name="password"
          placeholder="password..."
        />
      </div>
      <div className="padding-btn">
        <button
          type="button"
          disabled={!formValid}
          className="modal-btn"
          //onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormSignIn;
