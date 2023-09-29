import axios from "axios";
import { COMMENT } from "../../utils/urlLocales";
import { POST_COMMENT, GET_ALL_COMMENTS } from "../actionsType";

export function getComment() {
  const token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    axios
      .get(COMMENT, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        dispatch({ type: GET_ALL_COMMENTS, payload: response.data });
      })
      .catch((error) => {
        console.error("An error has occurred:", error.message);
      });
  };
}

export const addComment = (comment) => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log("🚀 ~ file: actionsComments.js:21 ~ addComment ~ token:", token)
  return async (dispatch) => {
    try {
      const { data } = await axios.post(COMMENT, comment, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return dispatch({
        type: POST_COMMENT,
        payload: data,
      });
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
};
