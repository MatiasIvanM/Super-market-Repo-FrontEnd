import axios from 'axios';
import {ORDER_DETAIL} from '../../utils/urlLocales'
import{ADD_ORDER_DETAIL,GET_ORDER_DETAIL_BY_ID} from '../actionsType'

export function getOrderDetailById(id) {
	return (dispatch) => {
		axios.get(`${ORDER_DETAIL}${id}`)
		.then((response) => {
			dispatch({ type: GET_ORDER_DETAIL_BY_ID, payload: response.data });
		}).catch((error) => {
			console.error('An error occurred:', error.message);
			
		});
	};
}

//
export const addOrderDetail =  (orderDetail) => {
	return async (dispatch) => {
		try {
			const {data}= await axios.post(ORDER_DETAIL, orderDetail)
		  
		//    return dispatch({
		// 	 type: ADD_ORDER_DETAIL,
		// 	 payload: data,
		//   });
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	   
	};
};
