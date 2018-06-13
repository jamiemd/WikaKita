import { combineReducers } from "redux";
import FlashcardReducers from "./flashcards";
import AuthReducer from "./auth";
import { reducer as FormReducer } from "redux-form";

const rootReducer = combineReducers({
  auth: AuthReducer,
  flashcards: FlashcardReducers,
  form: FormReducer
});

export default rootReducer;
