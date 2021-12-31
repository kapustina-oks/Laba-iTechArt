import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { usersAuthorisation } from "../../../services/dataService";
import { PropsForm } from "../../../types/types";
import { useDispatch } from "react-redux";
import { authLogInAction, authLogOutAction, isAdminAction, userNameAction } from "../../../store/actionCreators/authActions";
import { validateLogin, validatePassword } from "../../../utils/validation";

const FormSignIn = ({ onSubmit }: PropsForm): JSX.Element => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginDirty, setLoginDirty] = useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = useState<boolean>(false);

  const [loginDirtyErr, setLoginDirtyErr] = useState<string>("Логин не может быть пустым");
  const [passwordDirtyErr, setPasswordDirtyErr] = useState<string>("Пароль не может быть пустым");

  const [formValid, setFormValid] = useState<boolean>(false);
  const [data, setData] = useState({
    login,
    password,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setData({ login, password });
    console.log(data);
  }, [login, password]);

  const handleSubmitForm = () => {
    usersAuthorisation("/api/auth/signIn", data)
      .then((res) => {
        if (res.ok) {
          dispatch(authLogInAction());
          dispatch(userNameAction(login));
          localStorage.setItem("user", login);
        } else {
          dispatch(authLogOutAction());
          localStorage.clear();
        }
        return res.json();
      })
      .then((userBody) => {
        localStorage.setItem("id", userBody.currentUserId);
        if (userBody.isAdmin) {
          dispatch(isAdminAction(true));
          localStorage.setItem("isAdmin", userBody.isAdmin);
        } else {
          dispatch(isAdminAction(false));
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
    setData({ ...data, login: e.target.value });
    setLogin(e.target.value);
    setLoginDirtyErr(validateLogin(loginValue));
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(e.target.value);
    setData({ ...data, password: e.target.value });
    setPasswordDirtyErr(validatePassword(passwordValue));
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
