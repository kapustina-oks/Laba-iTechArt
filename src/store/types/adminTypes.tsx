import { dataItems } from "@/types/types";

export enum ActionAdminTypes {
  CREATE_NEW_GAME = "CREATE_NEW_GAME",
  EDIT_GAME = "EDIT_GAME",
  DELETE_SET_SUCCESS = "DELETE_SET_SUCCESS",
  LOAD_GAME = "LOAD_GAME",
}

interface loadGames {
  type: ActionAdminTypes.LOAD_GAME;
  payload: {
    products: dataItems[];
  };
}

interface deleteSetSuccess {
  type: ActionAdminTypes.DELETE_SET_SUCCESS;
  payload: {
    id: number;
  };
}

interface editGames {
  type: ActionAdminTypes.EDIT_GAME;
  payload: {
    game: dataItems;
  };
}

interface createGame {
  type: ActionAdminTypes.CREATE_NEW_GAME;
  payload: {
    game: dataItems;
  };
}

export type IActionAdmin = createGame | editGames | deleteSetSuccess | loadGames;
