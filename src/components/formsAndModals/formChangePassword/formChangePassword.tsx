import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { usersChangePassword } from "../../../services/dataService";
import { IUsersChangePassword, PropsForm } from "../../../types/types";
import { validatePassword, validateRepeatPassword } from "../../../utils/validation";

const FormChangePassword = ({ onSubmit }: PropsForm): JSX.Element => {
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");

  const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
  const [passwordRepeatDirty, setPasswordRepeatDirty] = useState<boolean>(false);

  const [passwordDirtyErr, setPasswordDirtyErr] = useState<string>("Пароль не может быть пустым");
  const [passwordRepeatDirtyErr, setPasswordRepeatDirtyErr] = useState<string>("Пароль не может быть пустым");

  const [formValid, setFormValid] = useState<boolean>(false);
  const [data, setData] = useState<IUsersChangePassword>({
    password,
    passwordRepeat,
    id: localStorage.getItem("id"),
  });

  const handleSubmitForm = () => {
    console.log(data);
    usersChangePassword("/api/changePassword", data)
      .then((res) => {
        if (res.ok) {
          console.log(res);
        }
      })
      .then(onSubmit);
  };

  useEffect(() => {
    if (passwordDirtyErr || passwordRepeatDirtyErr) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [passwordDirtyErr, passwordRepeatDirtyErr]);

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

export default FormChangePassword;
