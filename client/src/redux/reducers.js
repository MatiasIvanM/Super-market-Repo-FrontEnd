import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  ADD_PRODUCT,
  MOD_PRODUCT,
  DEL_PRODUCT,
  GET_CUSTOMERS,
  GET_CUSTOMER_BY_ID,
  ADD_CUSTOMER,
  MOD_CUSTOMER,
  GET_ORDER_DETAIL_BY_ID,
  GET_ORDERS,
  GET_ORDER_BY_ID,

} from "../actionsType";

const initialState = {
  products: [],
  productsId: {},
  customers:[],
  customerId:{},
  orderDetailId:{},
  order:[],
  orderId:{},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //product
    case GET_PRODUCTS:
      return { ...state, products: action.payload };
    case GET_PRODUCT_BY_ID:
      return { ...state, productsId: action.payload };
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] }; //..
    case MOD_PRODUCT:
      const updatedProducts = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
      return { ...state, products: updatedProducts };
    //customer
    case GET_CUSTOMERS:
        return { ...state, customers: action.payload };
    case GET_CUSTOMER_BY_ID:
        return { ...state, customerId: action.payload };
    case ADD_CUSTOMER:
        return { ...state, customers: [...state.customers, action.payload] };
    case MOD_CUSTOMER:
            const { id } = action.payload;
            const updatedCustomers = state.customers.map(costumer => {
                if (costumer.id === id) {
                    return {
                        ...costumer,
                        ...action.payload,
                    };
                }
                return costumer;
            });
            return {
                ...state,
                customers: updatedCustomers,
            };
    //order detail
    case GET_ORDER_DETAIL_BY_ID:
        return { ...state, orderDetailId: action.payload };
    //order
    case GET_ORDERS:
      return { ...state, products: action.payload };
    case GET_ORDER_BY_ID:
      return { ...state, productsId: action.payload };

    default:
      return { ...state };
  }
};

export default rootReducer;
