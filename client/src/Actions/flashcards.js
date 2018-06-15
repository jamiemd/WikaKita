import axios from "axios";

export const GET_CARDS = "GET_CARDS";
export const NEXT_CARD = "NEXT_CARD";
export const SHOW_ANSWER = "SHOW_ANSWER";
export const UPDATE_BUCKET = "UPDATE_BUCKET";
export const GET_STATS = "GET_STATS";
export const RESET_CARD_STATE = "RESET_CARD_STATE";
export const CORRECT_ANSWER_COUNT = "CORRECT_ANSWER_COUNT";

const ROOT_URL = "http://localhost:8000/api";

// get flashcards from server
export const getCards = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/flashcards`)
      .then(res => {
        // console.log("res", res);
        dispatch({
          type: GET_CARDS,
          payload: res.data
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  };
};

// get next card
export const nextCard = () => {
  return {
    type: NEXT_CARD
  };
};

// show answer
export const showAnswer = () => {
  return {
    type: SHOW_ANSWER
  };
};

// reset cards
export const resetCardState = () => {
  return {
    type: RESET_CARD_STATE
  };
};

// correct answer count
export const correctAnswerCount = () => {
  return {
    type: CORRECT_ANSWER_COUNT
  };
};

// update bucket
export const updateBucket = (id, grade) => {
  return dispatch => {
    axios.put(`${ROOT_URL}/updateBucket`, { id, grade }).then(res => {
      dispatch({
        type: UPDATE_BUCKET
      });
    });
  };
};

// get stats
export const getStats = () => {
  return dispatch => {
    const apiUrl = `${ROOT_URL}/getStats`;
    axios.get(apiUrl).then(response => {
      dispatch({
        type: GET_STATS,
        payload: response.data
      });
    });
  };
};
