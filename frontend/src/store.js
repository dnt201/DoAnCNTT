import { createStore, applyMiddleware} from "redux"
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "./reducers"


const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const userToken = localStorage.getItem('userToken')


const shippingAddressFromStorage = localStorage.getItem('shipingInfo')
  ? JSON.parse(localStorage.getItem('shipingInfo'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shipingInfo: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage, userToken: userToken },
}

const middleware = [thunk]


const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;