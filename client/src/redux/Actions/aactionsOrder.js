import axios from 'axios';
import {ORDERS} from '../../utils/urlLocales'
import{GET_ORDERS,GET_ORDER_BY_ID} from '../actionsType'

export function getProducts() {
	return (dispatch) => {
		axios.get(ORDERS)
		.then((response) => {
			dispatch({ type: GET_ORDERS, payload: response.data });
		}).catch((error) => {
			console.error('An error has occurred:', error.message);
			
		});
	};
}

export function getProductById(id) {
	return (dispatch) => {
		axios.get(`${ORDERS}${id}`)
		.then((response) => {
			dispatch({ type: GET_ORDER_BY_ID, payload: response.data });
		}).catch((error) => {
			console.error('An error occurred:', error.message);
			
		});
	};
}