import { CREATE_NEW_GAME, EDIT_GAME, DELETE_SET_SUCCESS, LOAD_GAME } from "@/store/actions/adminAction";
import { createGames, editedGames, removeGame } from "@/services/dataService";
import { dataItems } from "@/types/types";
import { Dispatch } from "redux";

export const createGame = (game: dataItems) => ({
  type: CREATE_NEW_GAME,
  payload: {
    game,
  },
});

export const loadGames = (products: dataItems[]) => ({
  type: LOAD_GAME,
  payload: {
    products,
  },
});

export const editGames = (game: dataItems) => ({
  type: EDIT_GAME,
  payload: {
    game,
  },
});

export function deleteSetSuccess(id: number) {
  return {
    type: DELETE_SET_SUCCESS,
    payload: {
      id,
    },
  };
}

export function deleteGame(id: number) {
  return (dispatch: Dispatch) => {
    removeGame(`/api/games/${id}`)
      .then((res) => {
        console.log(res);
        dispatch(deleteSetSuccess(id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export const editNewGame = (gameObj: dataItems) => {
  return function (dispatch: Dispatch) {
    editedGames("/api/games", gameObj)
      .then((res) => {
        console.log(res);
        dispatch(editGames(gameObj));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createNewGame = (gameObj: dataItems) => {
  return function (dispatch: Dispatch) {
    createGames("/api/games", gameObj)
      .then((res) => {
        console.log(res);
        dispatch(createGame(gameObj));
      })
      .catch((error) => console.log(error));
  };
};
