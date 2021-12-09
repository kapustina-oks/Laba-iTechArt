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

export interface dataItems {
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
}

export interface PropsForm {
  onSubmit: () => void;
}

export interface IInitialState {
  auth: boolean;
  modal: boolean;
  userName: string;
  products: dataItems[];
  cart: [] | dataItems[];
  total: number;
}

export interface saveProfile {
  login: string;
  password: string;
  description: string;
  photo: string;
  id: number;
}

export enum ActionTypes {
  LOG_IN = "LOG_IN",
  LOG_OUT = "LOG_OUT",
  USER_NAME = "USER_NAME",
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
}

interface LoginTypeAction {
  type: ActionTypes.LOG_IN;
}
interface logoutTypeAction {
  type: ActionTypes.LOG_OUT;
}
interface openModalTypeAction {
  type: ActionTypes.OPEN_MODAL;
}
interface closeModalTypeAction {
  type: ActionTypes.CLOSE_MODAL;
}

interface userNameTypeAction {
  type: ActionTypes.USER_NAME;
  payload: string;
}

export type IAction =
  | LoginTypeAction
  | logoutTypeAction
  | openModalTypeAction
  | closeModalTypeAction
  | userNameTypeAction;

export interface IFilterState {
  genre: string;
  age: string;
  rating: string;
  price: string;
}
