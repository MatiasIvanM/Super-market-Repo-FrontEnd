import { GET_BUY } from '../actionsType'
import axios from "axios"
import { ALLBUY } from "../../utils/urlLocales"


export const getBuy = () => {
    return async function (dispatch) {
        const datos = await axios.get(ALLBUY);        
        const buy = datos.data;
        return dispatch({type:GET_BUY, payload:buy})
    }
};
