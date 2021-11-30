import { CLOSE_MODAL, OPEN_MODAL } from "@/store/actions";

export const openModalAction = () => ({ type: OPEN_MODAL });
export const closeModalAction = () => ({ type: CLOSE_MODAL });
