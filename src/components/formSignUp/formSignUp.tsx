import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PropsForm } from "@/types/types";
import { usersRegistration } from "@/services/dataService";
import { useDispatch, useSelector } from "react-redux";
import { authLogInAction, authLogOutAction, userNameAction } from "@/store/actionCreators/authActions";
import mockServerHelper from "webpack-mock-server/lib/mockServerHelper";
import { validateLogin, validatePassword, validateRepeatPassword } from "@/utils/validation";
import { removeAllItems } from "@/store/actionCreators/cartActions";
import { RootState } from "@/store/reducers/rootReducer";

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
    id: mockServerHelper.getUniqueIdInt(),
  });

  const router = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.auth);

  const handleSubmitForm = () => {
    usersRegistration("/api/auth/signUp", data)
      .then((res) => {
        if (res.ok) {
          dispatch(authLogInAction());
          dispatch(userNameAction(login));
          localStorage.setItem("user", login);
          localStorage.setItem("id", String(data.id));
          console.log(res);
          router.push("/profile");
        } else {
          dispatch(authLogOutAction());
        }
      })
      .then(onSubmit)
      .finally(() => {
        if (!auth) {
          dispatch(removeAllItems());
        }
      });
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
    setLogin(e.target.value);
    setLoginDirtyErr(validateLogin(loginValue));
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(e.target.value);
    setData({ ...data, password: e.target.value });
    setPasswordDirtyErr(validatePassword(passwordValue));
  };

  const handleChangeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordRepeatValue = e.target.value;
    setPasswordRepeat(e.target.value);
    setData({ ...data, passwordRepeat: e.target.value });
    setPasswordRepeatDirtyErr(validateRepeatPassword(passwordRepeatValue, password));
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
