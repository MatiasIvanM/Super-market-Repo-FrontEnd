import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CLEAR_PRODUCT_DETAILS,
  GET_PRODUCT_BY_NAME,
  ADD_PRODUCT,
  MOD_PRODUCT,
  // DEL_PRODUCT,
  GET_CUSTOMERS,
  GET_CUSTOMER_BY_ID,
  ADD_CUSTOMER,
  MOD_CUSTOMER,
  GET_ORDER_DETAIL_BY_ID,
  GET_ORDERS,
  GET_ORDER_BY_ID,
  FILTER_CATEGORY,
  ORDER_PRECIO,
  RANGO_PRECIOS,
  GET_SC_BY_ID,
  PUT_SC,
  POST_SC,
  ADD_PRODUCT_SC,
  GET_CATEGORY,
  CLEAR_SC,
  REMOVE_PRODUCT_SC,
  UPDATE_PRODUCT_QUANTITY_SC,
  POST_COMMENT,
  GET_ALL_COMMENTS
} from "./actionsType";




const initialState = {
  products: [],
  productsId: {},
  productsByName: [],
  productsFiltered: [],
  customers: [],
  customerId: {},
  orderDetailId: {},
  orders: [],
  orderId: {},
  shoppingCart:{},
  productsSC:[],
  category:[],
  comments:[],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //product
    case GET_PRODUCTS:
      return { ...state, products: action.payload, productsFiltered: action.payload };
    case GET_PRODUCT_BY_ID:
      return { ...state, productsId: action.payload };
    case CLEAR_PRODUCT_DETAILS:
        return {...state, productDetails: {},};
    case GET_PRODUCT_BY_NAME:
      return { ...state, productsByName: action.payload };
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] }; //..
    case MOD_PRODUCT:
      const updatedProducts = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
      return { ...state, products: updatedProducts };

    //Shopping Cart
    case GET_SC_BY_ID:
      return { ...state, shoppingCart: action.payload }
    case PUT_SC:
        return { ...state, shoppingCart: action.payload }
    case POST_SC:
        return { ...state, shoppingCart: action.payload }
    case ADD_PRODUCT_SC:
          const existingProductIndex = state.productsSC.findIndex(
            (product) => product.productDetails.id === action.payload.productDetails.id
          );
          if (existingProductIndex !== -1) {
            const updatedProducts = [...state.productsSC];
            updatedProducts[existingProductIndex].quantity += action.payload.quantity;
            return { ...state, productsSC: updatedProducts };
          } else {
            return { ...state, productsSC: [...state.productsSC, action.payload] };
          }
      case CLEAR_SC: return {...state, productsSC:action.payload}
      case REMOVE_PRODUCT_SC:
        const modifiProducts = state.productsSC.filter(
          (product) => product.productDetails.id !== action.payload
        );
            return { ...state, productsSC: modifiProducts };
      case UPDATE_PRODUCT_QUANTITY_SC:
      const { productId, quantityChange } = action.payload;

      // Encuentra el producto en el carrito por su ID
      const productChange = state.productsSC.map((product) => {
        if (product.productDetails.id === productId) {
          // Actualiza la cantidad sumando o restando la cantidadChange
          return {
            ...product,
            quantity: product.quantity + quantityChange,
          };
        }
        return product;
      });
      return { ...state, productsSC: productChange };
    //customer
    case GET_CUSTOMERS:
      return { ...state, customers: action.payload };
    case GET_CUSTOMER_BY_ID:
      return { ...state, customerId: action.payload.id };
    case ADD_CUSTOMER:
      return { ...state, customerId: action.payload };
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
      return { ...state, orders: action.payload };
    case GET_ORDER_BY_ID:
      return { ...state, orderId: action.payload };

    // CATEGORY 
    case GET_CATEGORY:
      return { ...state, category: action.payload };

    //filters
    case FILTER_CATEGORY:
      let categoryFiltered =
        action.payload === 'Todas'
          ? state.products
          : state.products.filter((producto) => {
            return producto.Categories.some(category => category.name === action.payload);
          });
      return { ...state, productsFiltered: [...categoryFiltered] }
    case ORDER_PRECIO:
      let priceFiltered = state.productsFiltered
      if (action.payload === 'None') {
      } else if (action.payload === 'MIN-max') {
        // eslint-disable-next-line
        priceFiltered.sort(function (a, b) {
          if (a.price > b.price) { return 1 }
          if (a.price < b.price) { return -1 }
        })
      } else if (action.payload === 'MAX-min') {
        // eslint-disable-next-line
        priceFiltered.sort(function (a, b) {
          if (a.price < b.price) { return 1 }
          if (a.price > b.price) { return -1 }
        })
      }
      return { ...state, productsFiltered: [...priceFiltered] }
    case RANGO_PRECIOS:
      let priceRangeFiltered =
        state.productsFiltered.filter((producto) =>
          producto.price >= action.payload.min
          &&
          producto.price <= action.payload.max)
      return { ...state, productsFiltered: [...priceRangeFiltered] }
    //comments
    case GET_ALL_COMMENTS:
      return { ...state, comments: action.payload };
    case POST_COMMENT:
        return { ...state, comments: action.payload };
    
    //default
    default:
      return { ...state };
  }
};


export default rootReducer;