import { GET_PRODUCTS, GET_PRODUCT_BY_ID, ADD_PRODUCT, MOD_PRODUCT, DEL_PRODUCT } from './actionsType'
import { FILTER_CATEGORY } from './actionsType';

const initialState = {
    products: [],
    productsId: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...state, products: action.payload };
        case GET_PRODUCT_BY_ID:
            return { ...state, productsId: action.payload };
        case ADD_PRODUCT:
            return { ...state, products: [...state.products, action.payload], };//..
        case MOD_PRODUCT:
            const updatedProducts = state.products.map((product) =>
                product.id === action.payload.id ? action.payload : product
            );
            return { ...state, products: updatedProducts };
        default:
            return { ...state };
    }
}

export default rootReducer;