import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

export const addToCart = (id, qty,buynow) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.product._id,
      name: data.product.name,
      image: data.product.images,
      price: data.product.price,
      salePrice: data.product.price-(data.product.price*data.product.sale/100),
      sale: data.product.sale,
      stock: data.product.stock,
      qty,
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  if(buynow) document.location.href = '/cart';
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shipingInfo', JSON.stringify(data))

}
