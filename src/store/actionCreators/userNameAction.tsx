import { USER_NAME } from "@/store/actions";

export const userNameAction = (payload: string) => ({ type: USER_NAME, payload });
