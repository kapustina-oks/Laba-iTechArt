import { CREATE_NEW_GAME, DELETE_SET_SUCCESS, EDIT_GAME, GET_ALL_GAMES, REMOVE_GAME } from "@/store/actions";

const adminReducer = (state = [], action) => {
  switch (action.type){
    case CREATE_NEW_GAME:
      return [
        ...state,
        Object.assign({}, action.contact)
      ];
    case REMOVE_GAME:
      return state.filter((data, i) => i !== action.id);
    case EDIT_GAME:
      return {
        ...state,
        editedGame: action.payload.game,
      };

    case DELETE_SET_SUCCESS:
      return action.id;

    case GET_ALL_GAMES:
      return state.filter((data, i) => i !== action.id);
    default:
      return state;
  }
};

export default adminReducer;
