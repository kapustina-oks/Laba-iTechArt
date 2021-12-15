import { CREATE_NEW_GAME, EDIT_GAME, DELETE_SET_SUCCESS } from "@/store/actions";
import { createGames, editedGames, removeGame } from "@/services/dataService";
import { dataItems } from "@/types/types";
import { Dispatch } from "redux";

export const createGame = () => ({
  type: CREATE_NEW_GAME,
});

export const editGames = () => ({
  type: EDIT_GAME,
});

export function deleteSetSuccess() {
  return {
    type: DELETE_SET_SUCCESS,
  };
}

export function deleteGame(id: dataItems | number | undefined) {
  return (dispatch: Dispatch) => {
    removeGame(`/api/games/${id}`)
      .then((response) => console.log(response))
      .then(() => dispatch(deleteSetSuccess()));
  };
}

export const editNewGame = (gameObj: dataItems) => (dispatch: Dispatch) => {
  console.log(gameObj);
  editedGames("/api/games", gameObj)
    .then(() => {
      dispatch(editGames());
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createNewGame = (gameObj: dataItems) => (dispatch: Dispatch) => {
  console.log(gameObj);
  createGames("/api/games", gameObj)
    .then(() => {
      dispatch(createGame());
    })
    .catch((error) => {
      console.log(error);
    });
};
