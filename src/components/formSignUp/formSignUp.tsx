import { useEffect, useState } from "react";

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "maxLength":
          value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false);
          break;
        case "isLogin":
          /^[a-zA-z]{1}[a-zA-Z1-9]{3,20}$/.test(value) ? setLoginError(true) : setLoginError(false)
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || minLengthError || maxLengthError || loginError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, maxLengthError, loginError])

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    loginError,
    inputValid,
  };
};

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);

  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onBlur = (e) => {
    setIsDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

const FormSignUp = ({ onSubmit }) => {
  const login = useInput("", { isEmpty: true, minLength: 4, isLogin: true });
  const password = useInput("", { isEmpty: true, minLength: 6, maxLength: 8 });


  return (
    <form className="modal-body">
      <div className="form">
        <div className="form-group">
          <label htmlFor="login">Login</label>
          {login.isDirty && login.isEmpty && <div style={{ color: "red" }}>поле не мб пустым</div>}
          {login.isDirty && login.minLengthError && <div style={{ color: "red" }}>неккорекктная длина</div>}
          {login.isDirty && login.loginError && <div style={{ color: "red" }}>невалидный логин</div>}
          <input
            onChange={(e) => login.onChange(e)}
            onBlur={(e) => login.onBlur(e)}
            value={login.value}
            className="input-form"
            type="text"
            name="login"
            placeholder="login..."
          />
        </div>
        <div className="form-group">
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
        </div>
        <div className="form-group">
          <label htmlFor="password">Repeat Password</label>
          <input className="input-form" type="text" name="repeat-password" placeholder="repeat password..." />
        </div>
        <div className="padding-btn">
          <button disabled={!login.inputValid || !password.inputValid} className="modal-btn" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
export default FormSignUp;
