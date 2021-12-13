import { IInitialState } from "@/types/types";

const initialState: IInitialState = {
  auth: false,
  modal: false,
  userName: "",
  editModal: false,
  game: {},
  loading: false,
  error: "",
};

export default initialState;
