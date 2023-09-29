import axios from 'axios';
import { PRODUCT } from '../../utils/urlLocales'
import { GET_PRODUCTS, GET_PRODUCT_BY_ID, ADD_PRODUCT, MOD_PRODUCT, DEL_PRODUCT, GET_PRODUCT_BY_NAME, FILTER_CATEGORY, ORDER_PRECIO, RANGO_PRECIOS, CLEAR_PRODUCT_DETAILS, MOD_QUANTITY_LOCAL } from '../actionsType'
import Swal from 'sweetalert2';

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

	return async (dispatch) => {
		try {
		  const response = await axios.get(`${PRODUCT}${id}`);
		  dispatch({ type: GET_PRODUCT_BY_ID, payload: response.data });
		  return response.data; 
		} catch (error) {
		  console.error('An error occurred:', error.message);
		  throw error; 
		}
	  };
	  
}

// export function getProductsByName(name) {
// 	return (dispatch) => {
// 		axios.get(`${PRODUCT}name?name=${name}`)
// 			.then((response) => {
// 				dispatch({ type: GET_PRODUCT_BY_NAME, payload: response.data });
// 			}).catch((error) => {
// 				if (error.response && error.response.status === 404) {
// 					alert('Product not found.');
// 				} else {
// 					console.error('An error occurred:', error.message);
// 				}
// 			});
// 	};
// }

// export function getProductsByName(name) {
// 	return (dispatch) => {
// 		axios.get(`${PRODUCT}name?name=${name}`)
// 			.then((response) => {
// 				dispatch({ type: GET_PRODUCT_BY_NAME, payload: response.data });
// 			})
// 			.catch((error) => {
// 				if (error.response && error.response.status === 404) {
// 					Swal.fire({
// 						icon: 'warning',
// 						title: 'Producto no encontrado',
// 						text: 'Parece que el producto que buscas no existe o aun no lo tenemos.',
// 					});
// 				} else {
// 					console.error('An error occurred:', error.message);
// 				}
// 			});
// 	};
// }
export function getProductsByName(name) {
	return (dispatch) => {
	  axios
		.get(`${PRODUCT}name?name=${name}`)
		.then((response) => {
		  const products = response.data;
  
		  // Verificar si algún producto tiene available === false
		  const hasUnavailableProducts = products.some((product) => !product.available);
  
		  if (hasUnavailableProducts) {
			// Mostrar el SweetAlert de error
			Swal.fire({
			  icon: 'warning',
			  title: 'Producto no encontrado',
			  text: 'Parece que el producto que buscas no existe o aún no lo tenemos.',
			});
		  } else {
			// Despachar la acción normalmente si no hay productos no disponibles
			dispatch({ type: GET_PRODUCT_BY_NAME, payload: products });
		  }
		})
		.catch((error) => {
		  if (error.response && error.response.status === 404) {
			Swal.fire({
			  icon: 'warning',
			  title: 'Producto no encontrado',
			  text: 'Parece que el producto que buscas no existe o aún no lo tenemos.',
			});
		  } else {
			console.error('An error occurred:', error.message);
		  }
		});
	};
  }

export const addProduct = (formData) => {
	const token = JSON.parse(localStorage.getItem("token"));
	console.log(formData)
	return async (dispatch) => {
		try {
			const { data } = await axios.post(PRODUCT, formData,{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data'
				}
			
			})
			console.log("🚀 ~ file: actionsProducts.js:57 ~ return ~ data:", data)

			return dispatch({
				type: ADD_PRODUCT,
				payload: data,
			});
		} catch (error) {
			console.error('Error en la solicitud POST:', error);
			if (error.response) {
			  // El servidor respondió con un estado de error
			  console.error('Estado de respuesta del servidor:', error.response);
			  console.error('Mensaje del servidor:', error.response);
			}
			throw error;
		  }
		};
	  };

export const modProduct = (product) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.put(PRODUCT, product);

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
			const { data } = await axios.delete(endpoint);

			return dispatch({
				type: DEL_PRODUCT,
				payload: data,
			});
		} catch (error) {
			console.error('An error occurred:', error.message);
		}

	};


};

export const filterByCategory = (category) => {
	return (dispatch) => {
		try {
			
			return dispatch({
				type: FILTER_CATEGORY,
				payload: category,
			});
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	};
};

export const orderPrecio = (order) => {
	return (dispatch) => {
		try {
			return dispatch({
				type: ORDER_PRECIO,
				payload: order,
			});
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	};
};

export const rangoPrecios = (range) => {
	return (dispatch) => {
		try {
			return dispatch({
				type: RANGO_PRECIOS,
				payload: range,
			});
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	};
};

export const clearProductDetails = () => {
	return {
	  type: CLEAR_PRODUCT_DETAILS,
	};
  };

  export const modQuantityLocal = (product) => {
	return (dispatch) => {
		try {
			return dispatch({
				type: MOD_QUANTITY_LOCAL,
				payload: product,
			});
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	};
};