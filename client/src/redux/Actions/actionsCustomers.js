import axios from 'axios';
import {CUSTOMER} from '../../utils/urlLocales'
import{GET_CUSTOMERS,GET_CUSTOMER_BY_ID,ADD_CUSTOMER,MOD_CUSTOMER,DEL_CUSTOMER} from '../actionsType'

export function getProducts() {
	return (dispatch) => {
		axios.get(CUSTOMER)
		.then((response) => {
			dispatch({ type: GET_CUSTOMERS, payload: response.data });
		}).catch((error) => {
			console.error('An error has occurred:', error.message);
			
		});
	};
}

export function getProductById(id) {
	return (dispatch) => {
		axios.get(`${CUSTOMER}${id}`)
		.then((response) => {
			dispatch({ type: GET_CUSTOMER_BY_ID, payload: response.data });
		}).catch((error) => {
			console.error('An error occurred:', error.message);
			
		});
	};
}

export const addProduct =  (customer) => {
	return async (dispatch) => {
		try {
			const {data}= await axios.post(CUSTOMER, customer)
		  
		   return dispatch({
			 type: ADD_CUSTOMER,
			 payload: data,
		  });
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	   
	};
};

export const modProduct =  (customer) => {
	return async (dispatch) => {
		try {
			const {data}= await axios.put(CUSTOMER, customer);

			return dispatch({
				type: MOD_CUSTOMER,
				payload: data,
			 });
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
		  
	   
	};
};

export const deleteCustomer = (id) => {
	const endpoint = CUSTOMER + id;
	return async (dispatch) => {
		try {
			const {data}= await axios.delete(endpoint);
	   
		  return dispatch({
			 type: DEL_CUSTOMER,
			 payload: data,
	   });
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	   
	};
};