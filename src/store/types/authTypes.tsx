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
