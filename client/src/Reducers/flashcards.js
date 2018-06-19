import { loadState } from "../localStorage";

import {
  GET_CARDS,
  NEXT_CARD,
  SHOW_ANSWER,
  GET_STATS,
  RESET_CARD_STATE,
  CORRECT_ANSWER_COUNT
} from "../Actions/flashcards";

let currentCardState = loadState().flashcards.currentIndex;
console.log("currentCardState", currentCardState);
const initialState = {
  data: [],
  currentIndex: 0,
  cardSide: "front",
  correctAnswerCount: 0
};

export default (state = initialState, action) => {
  if (currentCardState === undefined) {
    currentCardState = 0;
  }
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        data: action.payload,
        currentIndex: currentCardState
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
    case RESET_CARD_STATE:
      return {
        ...state,
        showResultsPage: false,
        correctAnswerCount: 0
      };
    case CORRECT_ANSWER_COUNT:
      return {
        ...state,
        correctAnswerCount: state.correctAnswerCount + 1
      };
    case GET_STATS:
      return {
        ...state,
        data: action.payload
      };
    // case TOGGLE_LANGUAGE:
    //   // console.log("state.currentLanguage", state.currentLanguage);
    //   if (state.currentLanguage === "english") {
    //     state.currentLanguage = "tagalog";
    //   } else {
    //     state.currentLanguage = "english";
    //   }
    // return {
    //   ...state,
    //   data: state.data,
    //   currentLanguage: state.currentLanguage
    // };
    default:
      return state;
  }
};
