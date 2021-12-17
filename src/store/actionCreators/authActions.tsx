import { CLOSE_MODAL, LOG_IN, LOG_OUT, OPEN_MODAL, USER_NAME } from "@/store/actions/authAction";

export const authLogInAction = () => ({ type: LOG_IN });
export const authLogOutAction = () => ({ type: LOG_OUT });
export const openModalAction = () => ({ type: OPEN_MODAL });
export const closeModalAction = () => ({ type: CLOSE_MODAL });
export const userNameAction = (payload: string) => ({ type: USER_NAME, payload });
