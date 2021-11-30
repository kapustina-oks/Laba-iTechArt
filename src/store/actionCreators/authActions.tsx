import { LOG_IN, LOG_OUT } from "@/store/actions";

export const authLogInAction = () => ({ type: LOG_IN });
export const authLogOutAction = () => ({ type: LOG_OUT });
