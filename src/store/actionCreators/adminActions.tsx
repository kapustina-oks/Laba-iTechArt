import {
  CREATE_NEW_GAME,
  EDIT_GAME,
  FETCH_GAME_SUCCESS,
  FETCH_GAME_REQUEST,
  FETCH_GAME_FAILURE,
  REMOVE_GAME,
} from "@/store/actions";
import { getResource } from "@/services/dataService";

export const createGame = (game) => ({
  type: CREATE_NEW_GAME,
  game,
});

export const deleteGame = (id) => ({
  type: REMOVE_GAME,
  id,
});

export const editGames = (id) => ({
  type: EDIT_GAME,
  id,
});

export const fetchGameRequest = (itemID) => ({
  type: FETCH_GAME_REQUEST,
  payload: {
    id: itemID,
  },
});

export const fetchGameSuccess = (game) => ({
  type: FETCH_GAME_SUCCESS,
  payload: game,
});

export const fetchGameFailure = (error) => ({
  type: FETCH_GAME_FAILURE,
  payload: error,
});

export const getGame = (id) => (dispatch) => {
  dispatch(fetchGameRequest(id));
  getResource(`/api/games/product=${id}`)
    .then((response) => {
      const game = response;
      dispatch(fetchGameSuccess(game));
    })
    .catch((error) => {
      dispatch(fetchGameFailure(error.message));
    });
};
