import { IInitialState } from "@/types/types";
import dataGames from "../mock/dataBase";

const gamesList = [...dataGames];

const initialState: IInitialState = {
  auth: false,
  modal: false,
  userName: "",
  products: gamesList,
  cart: [],
  total: 0,
};

export default initialState;
