import{LOAD_STOCK,MOD_STOCK} from '../actionsType';

export const loadStock = (data) => {
    return {
      type: LOAD_STOCK,
      payload: data,
    };
};

export const updateStock = (data) => {
    return {
      type: MOD_STOCK,
      payload: data,
    };
    };