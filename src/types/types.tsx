export interface ICategories {
  id: number;
  name: string;
  title: string;
  icons: string;
}

export interface Menu {
  title: string;
  path: string;
  cName: string;
}

export interface dataItems {
  name: string;
  id: number;
  img: string;
  rating: number;
  price: string;
  categories: string[];
  date: Date;
  description: string;
}

export interface IContext {
  auth: boolean;
  userName: string;
  authLogIn: (user: { login: string }) => void;
  authLogOut: () => void;
}

export interface IPostData {
  login: string;
  password: string;
  passwordRepeat: string;
}

export interface IPutData {
  login: string;
  password: string;
}

export interface PropsForm {
  onSubmit: () => void;
}
