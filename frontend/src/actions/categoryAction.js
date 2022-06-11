import axios from 'axios'
import {
    ALL_CATEGORY_LIST_REQUEST,
    ALL_CATEGORY_LIST_SUCCESS,
    ALL_CATEGORY_LIST_FAIL,
    
    // CATEGORY_LIST_REQUEST,
    // CATEGORY_LIST_SUCCESS,
    // CATEGORY_LIST_FAIL,

    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,

    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,

    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_RESET
} from '../constants/categoryConstants'

import { logout } from './userActions'

export const getAllCategories = () => async (dispatch) => {
    try {
      dispatch({
        type: ALL_CATEGORY_LIST_REQUEST,
      })
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.get( '/api/v1/categories',config)
      dispatch({
        type: ALL_CATEGORY_LIST_SUCCESS,
        payload: data.categories,
      })
    } catch (error) {
      dispatch({
        type: ALL_CATEGORY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const createCategory = (name,parent,image) => async (dispatch) => {
  try {
    dispatch({
      type:  CATEGORY_CREATE_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post( '/api/v1/admin/categories/new',{name,parent,image},config)
    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data.categories,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
} 

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type:  CATEGORY_DELETE_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    await axios.delete( `/api/v1/admin/categories/${id}`,config)
    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateCategory = (id, name, image) => async (dispatch) => {
  try {
    dispatch({
      type:  CATEGORY_UPDATE_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    await axios.put( `/api/v1/admin/categories/${id}`,{name,image},config)
    dispatch({
      type: CATEGORY_UPDATE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
