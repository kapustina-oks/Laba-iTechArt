import { useEffect, useState } from "react";

export const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "minLength":
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
          break;
        case "maxLength":
          value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false);
          break;
        case "isLogin":
          /^[a-zA-Z]{1}[a-zA-Z1-9]{3,20}$/.test(value) ? setLoginError(false) : setLoginError(true);
          break;
      }
    }
  }, [value]);

  // useEffect(() => {
  //   if (isEmpty) {
  //     setMsg("поле не мб пустым");
  //   } else if (minLengthError) {
  //     setMsg("неккорекктная длина");
  //   } else if (loginError) {
  //     setMsg("невалидный логин");
  //   } else {
  //     setMsg("");
  //   }
  // }, [value]);

  useEffect(() => {
    if (isEmpty || minLengthError || maxLengthError || loginError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, maxLengthError, loginError]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    loginError,
    inputValid,

  };
};
