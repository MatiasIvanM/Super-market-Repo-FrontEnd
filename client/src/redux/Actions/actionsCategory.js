
import axios from 'axios';
import {CATEGORY} from '../../utils/urlLocales'
import { GET_CATEGORY, ADD_CATEGORY } from './../actionsType';


export function selectCategory() {
	return async function (dispatch) {
        const json = await axios.get(CATEGORY);
		return dispatch({
            type: GET_CATEGORY,
            payload: json.data,
        });
    }  
};	

export function addCategory (data) {
    return function (dispatch) {
      axios.post(CATEGORY, data)
      .then(res=> alert("Categoria Created"))
      .catch(error=> alert(error));
    }
  };