import axios from 'axios';
import {COMMENT} from '../../utils/urlLocales'
import{POST_COMMENT,GET_ALL_COMMENTS} from '../actionsType'


export function getComment() {
	return (dispatch) => {
		axios.get(COMMENT)
		.then((response) => {
			dispatch({ type: GET_ALL_COMMENTS, payload: response.data });
		}).catch((error) => {
			console.error('An error has occurred:', error.message);
			
		});
	};
}

export const addComment =  (comment) => {
	return async (dispatch) => {
		try {
			const {data}= await axios.post(COMMENT, comment)
		  
		   return dispatch({
			 type: POST_COMMENT,
			 payload: data,
		  });
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	   
	};
};
