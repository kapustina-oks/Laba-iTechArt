import { ChangeEvent, FocusEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/components/context/context";
import { useHistory } from "react-router-dom";
import { IContext, PropsForm } from "@/types/types";
import { usersRegistration } from "@/services/dataService";

const FormSignUp = ({ onSubmit }: PropsForm): JSX.Element => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");

  const [loginDirty, setLoginDirty] = useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
  const [passwordRepeatDirty, setPasswordRepeatDirty] = useState<boolean>(false);

  const [loginDirtyErr, setLoginDirtyErr] = useState<string>("Логин не может быть пустым");
  const [passwordDirtyErr, setPasswordDirtyErr] = useState<string>("Пароль не может быть пустым");
  const [passwordRepeatDirtyErr, setPasswordRepeatDirtyErr] = useState<string>("Пароль не может быть пустым");

  const [formValid, setFormValid] = useState<boolean>(false);
  const [data, setData] = useState({
    login,
    password,
    passwordRepeat,
  });

  const { authLogIn, authLogOut } = useContext<IContext>(AuthContext);
  const router = useHistory();

  const handleSubmitForm = () => {
    console.log(data);
    usersRegistration("/api/auth/signUp", data)
      .then((res) => {
        if (res.ok) {
          authLogIn(data);
          localStorage.setItem("user", login);
          console.log(res);
          router.push("/profile");
        } else {
          authLogOut();
        }
      })
      .then(onSubmit);
  };

  useEffect(() => {
    if (loginDirtyErr || passwordDirtyErr || passwordRepeatDirtyErr) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [loginDirtyErr, passwordDirtyErr, passwordRepeatDirtyErr]);

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const loginValue = e.target.value;
    setData({ ...data, login: e.target.value });
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
    setData({ ...data, password: e.target.value });
    if (e.target.value.length < 3 || e.target.value.length > 20) {
      setPasswordDirtyErr("В пароле должно быть от 4 до 20 символов");
      if (!e.target.value) {
        setPasswordDirtyErr("Пароль не может быть пустым");
      }
    } else {
      setPasswordDirtyErr("");
    }
  };

  const handleChangeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordRepeat(e.target.value);
    setData({ ...data, passwordRepeat: e.target.value });
    if (e.target.value !== password) {
      setPasswordRepeatDirtyErr("Неверный пароль");
    } else {
      setPasswordRepeatDirtyErr("");
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
      case "repeat-password":
        setPasswordRepeatDirty(true);
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
            onChange={handleChangeLogin}
            onBlur={blurHandler}
            value={login}
            className="input-form"
            type="text"
            name="login"
            placeholder="login..."
          />
        </label>
        <label htmlFor="password">
          Password
          {passwordDirty ? <div style={{ color: "red", fontSize: "13px" }}>{passwordDirtyErr}</div> : null}
          <input
            onChange={handleChangePassword}
            onBlur={blurHandler}
            value={password}
            className="input-form"
            type="text"
            name="password"
            placeholder="password..."
          />
        </label>
        <label htmlFor="repeat-password">
          Repeat Password
          {passwordRepeatDirty ? <div style={{ color: "red", fontSize: "13px" }}>{passwordRepeatDirtyErr}</div> : null}
          <input
            className="input-form"
            onBlur={blurHandler}
            onChange={handleChangeRepeatPassword}
            value={passwordRepeat}
            type="text"
            name="repeat-password"
            placeholder="repeat password..."
          />
        </label>
        <div className="padding-btn">
          <button disabled={!formValid} className="modal-btn" type="button" onClick={handleSubmitForm}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default FormSignUp;
