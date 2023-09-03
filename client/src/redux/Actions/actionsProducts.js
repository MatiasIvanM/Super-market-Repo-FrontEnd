import axios from 'axios';
import {PRODUCT} from '../../utils/urlLocales'
import{GET_PRODUCTS,GET_PRODUCT_BY_ID,ADD_PRODUCT,MOD_PRODUCT,DEL_PRODUCT,} from '../actionsType'

export function getProducts() {
	return (dispatch) => {
		axios.get(PRODUCT)
		.then((response) => {
			dispatch({ type: GET_PRODUCTS, payload: response.data });
		}).catch((error) => {
			console.error('An error has occurred:', error.message);
			
		});
	};
}

export function getProductById(id) {
	return (dispatch) => {
		axios.get(`${PRODUCT}${id}`)
		.then((response) => {
			dispatch({ type: GET_PRODUCT_BY_ID, payload: response.data });
		}).catch((error) => {
			console.error('An error occurred:', error.message);
			
		});
	};
}

export const addProduct =  (product) => {
	return async (dispatch) => {
		try {
			const {data}= await axios.post(PRODUCT, product)
		  
		   return dispatch({
			 type: ADD_PRODUCT,
			 payload: data,
		  });
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	   
	};
  };

  export const modProduct =  (product) => {
	return async (dispatch) => {
		try {
			const {data}= await axios.put(PRODUCT, product);

			return dispatch({
				type: MOD_PRODUCT,
				payload: data,
			 });
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
		  
	   
	};
  };

  export const deleteProduct = (id) => {
	const endpoint = PRODUCT + id;
	return async (dispatch) => {
		try {
			const {data}= await axios.delete(endpoint);
	   
		  return dispatch({
			 type: DEL_PRODUCT,
			 payload: data,
	   });
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	   
	};
};