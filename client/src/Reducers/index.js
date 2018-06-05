import { combineReducers } from "redux";
import AuthReducer from "./auth";
import FlashCardsReducer from "./flashcards";

const rootReducer = combineReducers({
  auth: AuthReducer,
  flashcards: FlashCardsReducer
});

export default rootReducer;
