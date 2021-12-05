export function validateLogin(loginValue: string) {
  console.log(loginValue);
  if (!loginValue) {
    return "Логин не может быть пустым";
  }
  if (!/^[a-zA-Z1-9]+$/.test(loginValue)) {
    return "В логине должны быть латинские буквы/цифры";
  }
  if (loginValue.length < 4 || loginValue.length > 20) {
    return "В логине должен быть от 4 до 20 символов";
  }
  if (parseInt(loginValue.substr(0, 1), 10)) {
    return "Логин должен начинаться с буквы";
  }

  return "";
}

export function validatePassword(passwordValue: string) {
  if (!passwordValue) {
    return "Пароль не может быть пустым";
  }
  if (passwordValue.length < 3 || passwordValue.length > 20) {
    return "В пароле должно быть от 4 до 20 символов";
  }
  return "";
}

export function validateRepeatPassword(passwordRepeatValue: string, password: string) {
  if (passwordRepeatValue !== password) {
    return "Неверный пароль";
  }
  return "";
}

export function validateDescription(descriptionValue: string) {
  if (descriptionValue.length < 10 || descriptionValue.length > 250) {
    return "В описании должно быть от 10 до 250 символов";
  }
  if (!descriptionValue) {
    return "Описание не может быть пустым";
  }
  return "";
}
