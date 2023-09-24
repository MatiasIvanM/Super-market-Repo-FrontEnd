import axios from 'axios';
import {CUSTOMER} from '../../utils/urlLocales'
import{GET_CUSTOMERS,GET_CUSTOMER_BY_ID,ADD_CUSTOMER,MOD_CUSTOMER,DEL_CUSTOMER,GET_CUSTOMER_BY_EMAIL, LOGIN_CUSTOMER} from '../actionsType'

export function getCustomers() {
	const token = JSON.parse(localStorage.getItem('token'))
	return (dispatch) => {
		axios.get(CUSTOMER,{headers:{'Authorization': `Bearer ${token}`}})
		.then((response) => {
			dispatch({ type: GET_CUSTOMERS, payload: response.data });
		}).catch((error) => {
			console.error('An error has occurred:', error.message);
			
		});
	};
}

export function getCustomerById(id) {
	const token = JSON.parse(localStorage.getItem('token'))
	return async (dispatch) =>{
		try {
			const {data} = await axios.get(`${CUSTOMER}${id}`,{headers:{'Authorization': `Bearer ${token}`}})
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
	const token = JSON.parse(localStorage.getItem('token'))
	return async (dispatch) =>{
		try {
			const {data} = await axios.get(`${CUSTOMER}email?email=${email}`,{headers:{'Authorization': `Bearer ${token}`}})
			return dispatch({
				type: GET_CUSTOMER_BY_EMAIL,
			    payload: data,
			})
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	}
}

export function loginCustomer(customer) {
	return async (dispatch) =>{
		try {
			const {data} = await axios.post(`${CUSTOMER}login`,customer)
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
	const token = JSON.parse(localStorage.getItem('token'))
	return async (dispatch) => {
		try {
			const {data}= await axios.put(CUSTOMER, customer,{headers:{'Authorization': `Bearer ${token}`}});

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
	const token = JSON.parse(localStorage.getItem('token'))
	const endpoint = CUSTOMER + id;
	return async (dispatch) => {
		try {
			const {data}= await axios.delete(endpoint,{headers:{'Authorization': `Bearer ${token}`}});
	   
		  return dispatch({
			 type: DEL_CUSTOMER,
			 payload: data,
	   });
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	   
	};
};