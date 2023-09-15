
import axios from 'axios';
import {CATEGORY} from '../../utils/urlLocales'
import { GET_CATEGORY } from './../actionsType';


export function selectCategory() {
	return async function (dispatch) {
        const json = await axios.get(CATEGORY);
		return dispatch({
            type: GET_CATEGORY,
            payload: json.data,
        });
    }  
};	