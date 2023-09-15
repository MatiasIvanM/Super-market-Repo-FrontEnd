import axios from 'axios';
import {CUSTOMER} from '../../utils/urlLocales'
import{GET_CUSTOMERS,GET_CUSTOMER_BY_ID,ADD_CUSTOMER,MOD_CUSTOMER,DEL_CUSTOMER,GET_CUSTOMER_BY_EMAIL, LOGIN_CUSTOMER} from '../actionsType'

export function getCustomers() {
	return (dispatch) => {
		axios.get(CUSTOMER)
		.then((response) => {
			dispatch({ type: GET_CUSTOMERS, payload: response.data });
		}).catch((error) => {
			console.error('An error has occurred:', error.message);
			
		});
	};
}

export function getCustomerById(id) {
	return async (dispatch) =>{
		try {
			const {data} = await axios.get(`${CUSTOMER}${id}`)
			return dispatch({
				type: GET_CUSTOMER_BY_ID,
			    payload: data,
			})
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	}
}


export function getCustomerByEmail(email) {
	return async (dispatch) =>{
		try {
			const {data} = await axios.get(`${CUSTOMER}email?email=${email}`)
			return dispatch({
				type: GET_CUSTOMER_BY_EMAIL,
			    payload: data,
			})
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	}
}

export function login(customer) {
	return async (dispatch) =>{
		try {
			const {data} = await axios.get(`${CUSTOMER}login`,customer)
			return dispatch({
				type: LOGIN_CUSTOMER,
			    payload: data,
			})
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	}
}

export const addCustomer =  (customer) => {
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

export const modCustomer =  (customer) => {
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