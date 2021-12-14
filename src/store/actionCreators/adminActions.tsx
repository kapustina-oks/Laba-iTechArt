import {
  CREATE_NEW_GAME,
  EDIT_GAME,
  FETCH_GAME_SUCCESS,
  FETCH_GAME_REQUEST,
  FETCH_GAME_FAILURE,
  REMOVE_GAME,
  DELETE_SET_SUCCESS,
} from "@/store/actions";
import { createGames, editedGames, getResource, removeGame } from "@/services/dataService";

export const createGame = (game) => ({
  type: CREATE_NEW_GAME,
  game,
});


export const editGames = (game) => ({
  type: EDIT_GAME,
  payload: {
    game,
  },
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

export function deleteSetSuccess(id) {
  return {
    type: DELETE_SET_SUCCESS,
    id,
  };
}

export function deleteGame(id) {
  return (dispatch) => {
    removeGame(`/api/games/${id}`)
      .then((response) => console.log(response))
      .then((id) => dispatch(deleteSetSuccess(id)));
  };
}

export const getGame = (id) => (dispatch) => {
  dispatch(fetchGameRequest(id));
  getResource(`/api/games?product=${id}`)
    .then((response) => {
      const game = response;
      dispatch(fetchGameSuccess(game));
    })
    .catch((error) => {
      dispatch(fetchGameFailure(error.message));
    });
};

export const editNewGame = (gameObj) => (dispatch) => {
  console.log(gameObj);
  editedGames("/api/games", gameObj)
    .then((response) => {
      const game = response;
      dispatch(editGames(game));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createNewGame = (gameObj) => (dispatch) => {
  console.log(gameObj);
  createGames("/api/games", gameObj)
    .then((response) => {
      const game = response;
      dispatch(createGame(game));
    })
    .catch((error) => {
      console.log(error);
    });
};

// export const getGame = (id) => async (dispatch) => {
//   dispatch({ type: fetchGameRequest(id) });
//   const response = await getResource(`/api/games/product=${id}`);
//   setTimeout((game) => {
//     dispatch({ type: fetchGameSuccess(game), payload: response.data });
//   }, 500);
// };
