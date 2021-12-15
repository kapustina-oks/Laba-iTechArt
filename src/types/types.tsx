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

export interface ICart {
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
  total: number;
  game: dataItems[];
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

export enum ActionAdminTypes {
  CREATE_NEW_GAME = "CREATE_NEW_GAME",
  EDIT_GAME = "EDIT_GAME",
  DELETE_SET_SUCCESS = "DELETE_SET_SUCCESS",
}

export enum ActionCartTypes {
  ADD_TO_CART = "ADD_TO_CART",
  ADJUST_ITEM_QTY = "ADJUST_ITEM_QTY",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  REMOVE_ALL_ITEM = "REMOVE_ALL_ITEM",
  TOTAL_ITEMS = "TOTAL_ITEMS",
  LOCAL_STORAGE_CART = "LOCAL_STORAGE_CART",
}

interface deleteSetSuccess {
  type: ActionAdminTypes.DELETE_SET_SUCCESS;
}

interface editGames {
  type: ActionAdminTypes.EDIT_GAME;
}

interface createGame {
  type: ActionAdminTypes.CREATE_NEW_GAME;
}

export type IActionAdmin = createGame | editGames | deleteSetSuccess;

interface addCartFromLS {
  type: ActionCartTypes.LOCAL_STORAGE_CART;
  payload: {
    savedGames: ICart[];
    id?: number;
  };
}

interface totalItemsCart {
  type: ActionCartTypes.TOTAL_ITEMS;
  payload: {
    num: number;
    id?: number;
  };
}

interface addToCart {
  type: ActionCartTypes.ADD_TO_CART;
  payload: {
    id: number;
  };
}

interface removeFromCart {
  type: ActionCartTypes.REMOVE_FROM_CART;
  payload: {
    id: number;
  };
}

interface adjustItemQty {
  type: ActionCartTypes.ADJUST_ITEM_QTY;
  payload: {
    id: number;
    qty: number;
  };
}

interface removeAllItems {
  type: ActionCartTypes.REMOVE_ALL_ITEM;
}

export type IActionCart = addToCart | adjustItemQty | removeFromCart | removeAllItems | totalItemsCart | addCartFromLS;

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
