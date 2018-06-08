import axios from 'axios'

//Action types
const GET_CART = 'GET_CART'
const SET_CART = 'SET_CART'
const REMOVED_PRODUCT = 'REMOVED_PRODUCT'
const SET_EMPTY_CART = 'SET_EMPTY_CART'
// const SET_UPDATED_CART = 'SET_UPDATED_CART'


//Action creator
const getCart = cart => ({
  type: GET_CART,
  cart
})


const setCart = cart => ({
  type: SET_CART,
  cart
})

const removedProduct = productId => ({
  type: REMOVED_PRODUCT,
  productId: productId
})

const setEmptyCart = cart => ({
  type: SET_EMPTY_CART,
  cart
})


//Thunk Creator
export const fetchCart = () => {
  return async (dispatch) => {
    const res = await axios.get(`/api/cart`);
    const data = res.data;
    dispatch(getCart(data))
  }
}

export const addCart = (product) => {
  return async (dispatch) => {
    const res = await axios.put('/api/cart', product);
    const data = res.data;
    dispatch(setCart(data));
    return data;
  }
}

export const emptyCart = () => {
  console.log('empty cart action triggered ===================')
  return async (dispatch) => {
    const res = await axios.delete('/api/cart')
    const data = res.data
    dispatch(setEmptyCart(data))
  }
}

export const removeProduct = (productId) => {
  return async (dispatch) => {
    const res = await axios.delete(`/api/cart/${productId}`)
    dispatch(removedProduct(productId))
  }
}



//Initial State
const defaultCart = []

//REDUCER
export default function (state = defaultCart, action) {
  switch (action.type) {

    case GET_CART:
      return action.cart

    case SET_CART:
      return action.cart

    case REMOVED_PRODUCT:
      const productId = action.productId
      const cartCopy = state.slice()
      const filtered = cartCopy.filter(product => productId !== product.id)
      return filtered

    case SET_EMPTY_CART:
      console.log('SET EMPTY CART triggered ===========')
      return action.cart

    default:
      return state
 }
}