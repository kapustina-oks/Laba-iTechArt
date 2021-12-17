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
  id: number;
}

export interface dataItemsObj {
  [key: string]: unknown;
}

export interface dataItems extends dataItemsObj {
  name: string;
  id: number;
  img: string;
  rating: number;
  genres: string;
  age: string;
  price: string;
  categories: string[];
  date: Date;
  description: string;
}

export interface ICart extends dataItems {
  name: string;
  id: number;
  img: string;
  rating: number;
  genres: string;
  age: string;
  price: string;
  categories: string[];
  date: Date;
  description: string;
  qty: number;
}

export interface IContext {
  auth: boolean;
  userName: string;
  modal: boolean;
  authLogIn: (user: { login: string }) => void;
  authLogOut: () => void;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export interface IUsersRegistration {
  login: string;
  password: string;
  passwordRepeat: string;
  id: number;
}

export interface IUsersAuthorisation {
  login: string;
  password: string;
}

export interface IUsersProfileInfo {
  name: string;
  description: string;
}

export interface IUsersChangePassword {
  password: string;
  passwordRepeat: string;
  id: string | null;
}

export interface IUsers {
  password: string;
  passwordRepeat: string;
  login: string;
  description: string;
  photo: string;
  id: number;
  isAdmin: boolean;
}

export interface PropsForm {
  onSubmit: () => void;
}

export interface IInitialState {
  auth: boolean;
  modal: boolean;
  userName: string;
  products: dataItems[];
  cart: ICart[];
  productsCart: dataItems[];
  total: number;
  isAdmin: boolean;
}

export interface IFilterState {
  genre: string;
  age: string;
  rating: string;
  price: string;
}

