import { FETCH_GAME_FAILURE, FETCH_GAME_REQUEST, FETCH_GAME_SUCCESS } from "@/store/actions";
import initialState from "@/store/initialState";

const fetchReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case FETCH_GAME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_GAME_SUCCESS:
      return {
        loading: false,
        game: action.payload,
        error: "",
      };
    case FETCH_GAME_FAILURE:
      return {
        loading: false,
        game: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fetchReducer;
