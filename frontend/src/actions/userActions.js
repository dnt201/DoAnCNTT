import axios from 'axios'
import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL, 
  USER_DETAILS_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  //USER_UPDATE_RESET

} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/v1/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      user: data.user,
      token:data.token
    })

    localStorage.setItem('userInfo', JSON.stringify(data.user))
    localStorage.setItem('userToken', data.token)
    document.location.href = '/user'
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  document.location.href = '/login'
  localStorage.removeItem('userInfo')
  localStorage.removeItem('userToken')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shipingInfo')

  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  //dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: USER_LIST_RESET })

}

export const updateUserProfile = (name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put('api/v1/me/update', {name}, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data.user,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      user: data.user,
      token:data.token
    })
    localStorage.setItem('userInfo', JSON.stringify(data.user))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    })
  }
}

export const updateUserPassword = (oldPassword, password, confirmPassword) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_PASSWORD_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }   
    const { data }= await axios.put('api/v1/password/update', { oldPassword, password, confirmPassword },config)
 
    dispatch({
      type: USER_UPDATE_PASSWORD_SUCCESS,
      payload: data.data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      user: data.user,
      token:data.token
    })
  } catch (error) {
  
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_PASSWORD_FAIL,
      payload:  error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    })
  }
}

export const register = (name,email,password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }


    const { data } = await axios.post(
      '/api/v1/register',
      {name,email,password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      user: data.user,
      token:data.token
    })
 
    localStorage.setItem('userInfo', JSON.stringify(data.user))
    localStorage.setItem('userToken', JSON.stringify(data.token))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
//-------------------------- Admin --------------------------
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: { 
        Authorization: `Bearer ${userInfo.token}`,
      },
     
    }

    const { data } = await axios.get(`/api/v1/admin/users`, config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data.users,
    })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    })
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/admin/user/${id}`, config)

     dispatch({
      type: USER_DETAILS_SUCCESS,
      user: data.user,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const updateUser = (id,email,name,role) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(`/api/v1/admin/user/${id}`, { email, name, role } , config)

    dispatch({ type: USER_UPDATE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/v1/admin/user/${id}`, config)
    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    })
  }
}


