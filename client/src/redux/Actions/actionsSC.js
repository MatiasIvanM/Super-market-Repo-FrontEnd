import { GET_SC_BY_ID, PUT_SC, POST_SC,ADD_PRODUCT_SC,CLEAR_SC,REMOVE_PRODUCT_SC,UPDATE_PRODUCT_QUANTITY_SC,UPDATE_TOTAL,CLEAR_CUSTOMER_ID } from '../actionsType'
import axios from "axios"
import { SHOPPINGCART } from "../../utils/urlLocales"


export const getSC = (id) => {
    return async (dispatch)=> {
      try {
        let response = await axios.get(`${SHOPPINGCART}${id}`)
        console.log(response, "get carrito BYID")
            return dispatch({
                type: GET_SC_BY_ID,
                payload: response.data,
              });
      } catch (error) {
        console.error('Error:', error);
        // Manejar el error si es necesario
      }
    };
  };


  export const putShoppingCart =  (data) => {
  return async (dispatch) => {
    try {
      
      let response = await axios.put(SHOPPINGCART,data)
            console.log("🚀 ~ file: actionsSC.js:28 ~ return ~ response:", response)
            return dispatch({
                type: PUT_SC,
                payload: response.data,
              });
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
     
  };
  };

  export const updateTotal = (total) => {
    return {
      type: UPDATE_TOTAL,
      payload: total,
    };
    };

  export const addShoppingCart =  (data) => {
	return async (dispatch) => {
		try {
      console.log(data)
			let response = await axios.post(SHOPPINGCART,data)
            return dispatch({
                type: POST_SC,
                payload: response.data,
              });
		} catch (error) {
			console.error('An error occurred:', error.message);
		} 
	};
};

export const addProductSC = (product) => {
	console.log(product)
	return {
	  type: ADD_PRODUCT_SC,
	  payload: product,
	};
  };

  export const clearSC = ()=>{
    return{
      type: CLEAR_SC,
      payload:[]
    };
  };
  export const clearCustomerId = ()=>{
    return{
      type: CLEAR_CUSTOMER_ID,
      payload:{}
    };
  };


  export const removeProductSC = (productId) => {
    return {
      type: REMOVE_PRODUCT_SC,
      payload: productId,
    };
  };


  export const updateProductQuantitySC = (productId, quantityChange) => {
    return {
      type: UPDATE_PRODUCT_QUANTITY_SC,
      payload: {
        productId,
        quantityChange,
      },
    };
  };