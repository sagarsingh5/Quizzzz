import {
  ADD_CHOICE,
  ADD_POINTS,
  GET_DATA,
  REMOVE_CHOICE,
  SUBS_POINTS,
} from './actions';

const initialState = {
  data: [],
  choice: [],
  points: 0,
};
const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_CHOICE:
      return {
        ...state,
        choice: [...state.choice, action.payload],
      };
    case REMOVE_CHOICE:
      return {
        ...state,
        choice: state.choice.filter(item => item.id !== action.payload.id),
      };
    case ADD_POINTS:
      return {
        ...state,
        points: state.points + 1,
      };
    case SUBS_POINTS:
      return {
        ...state,
        points: state.points - 1,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
export default quizReducer;
