import { useContext, useEffect, useState } from "react";
import { putResource } from "@/services/dataService";
import { AuthContext } from "@/components/context/context";
import { useHistory } from "react-router-dom";
import { useInput } from "@/hooks/useInput";
import log from "webpack-mock-server/lib/log";

const FormSignUp = ({ onSubmit }) => {
  const login = useInput("", { isEmpty: true, minLength: 4, isLogin: true });
  const password = useInput("", { isEmpty: true, minLength: 6, maxLength: 8 });
  const [data, setData] = useState({
    login: "",
    password: "",
  });


  const { authLogIn, authLogOut } = useContext(AuthContext);
  const router = useHistory();

  useEffect(() => {
    setData({ login: login.value, password: password.value });
  }, [login.value, password.value]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    putResource("/api/auth/signUp", data)
      .then((res) => {
        if (res.ok) {
          authLogIn(data);
          console.log(res);
          router.push("/profile");
        } else {
          authLogOut();
        }
      })
      .then(onSubmit);
  };


  return (
    <div className="form">
      <div className="form-group">
        <label htmlFor="login">Login</label>
        {login.isDirty && login.isEmpty ? <div style={{ color: "red" }}>поле не мб пустым</div> : null}
        {login.isDirty && login.minLengthError ? <div style={{ color: "red" }}>неккорекктная длина</div> : null}
        {login.isDirty && login.loginError ? <div style={{ color: "red" }}>невалидный логин</div> : null}
        <input
          onChange={(e) => login.onChange(e)}
          onBlur={(e) => login.onBlur(e)}
          value={login.value}
          className="input-form"
          type="text"
          name="login"
          placeholder="login..."
        />

        <label htmlFor="password">Password</label>
        {password.isDirty && password.isEmpty && <div style={{ color: "red" }}>поле не мб пустым</div>}
        {password.isDirty && password.minLengthError && <div style={{ color: "red" }}>неккорекктная длина</div>}
        {password.isDirty && password.maxLengthError && <div style={{ color: "red" }}>слишком длинный пароль</div>}
        <input
          onChange={(e) => password.onChange(e)}
          onBlur={(e) => password.onBlur(e)}
          value={password.value}
          className="input-form"
          type="text"
          name="password"
          placeholder="password..."
        />
        <label htmlFor="password">Repeat Password</label>
        <input className="input-form" type="text" name="repeat-password" placeholder="repeat password..." />
        <div className="padding-btn">
          <button
            disabled={!login.inputValid || !password.inputValid}
            className="modal-btn"
            type="button"
            onClick={handleSubmitForm}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default FormSignUp;
