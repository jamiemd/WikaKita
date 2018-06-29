import {
  GET_CARDS,
  NEXT_CARD,
  SHOW_ANSWER,
  GET_STATS,
  RESET_CARD_STATE,
  CORRECT_ANSWER_COUNT
} from "../Actions/flashcards";

const initialState = {
  data: [],
  currentIndex: 0,
  cardSide: "front",
  correctAnswerCount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        data: action.payload,
        currentIndex: 0
      };
    case NEXT_CARD:
      return {
        ...state,
        data: state.data,
        currentIndex: state.currentIndex + 1,
        cardSide: "front"
      };
    case SHOW_ANSWER:
      return {
        ...state,
        data: state.data,
        cardSide: "back"
      };
    case CORRECT_ANSWER_COUNT:
      return {
        ...state,
        correctAnswerCount: state.correctAnswerCount + 1
      };
    case RESET_CARD_STATE:
      return {
        ...state,
        correctAnswerCount: 0,
        currentIndex: 0
      };
    case GET_STATS:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};
