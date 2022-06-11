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
    CATEGORY_DELETE_RESET,

    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_RESET,

    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_RESET
} from '../constants/categoryConstants'


  export const allCategoryReducer = (state = {}, action) => {
    switch (action.type) {
      case ALL_CATEGORY_LIST_REQUEST:
        return { loading: true }
      case ALL_CATEGORY_LIST_SUCCESS:
        return { loading: false, listCategories: action.payload, success: true}
      case ALL_CATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload, success:false}
      default:
        return state
    }
  }
  export const  createCategoryReducer  = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_CREATE_REQUEST:
        return { loading: true }
      case CATEGORY_CREATE_SUCCESS:
        return { loading: false, success: true}
      case CATEGORY_CREATE_FAIL:
        return { loading: false, error: action.payload, success:false}
      case CATEGORY_CREATE_RESET:
        return {success:false}
      default:
        return state
    }
  }
  export const  deleteCategoryReducer  = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_DELETE_REQUEST:
        return { loading: true }
      case CATEGORY_DELETE_SUCCESS:
        return { loading: false, success: true}
      case CATEGORY_DELETE_FAIL:
        return { loading: false, error: action.payload, success:false}
      case CATEGORY_DELETE_RESET:
        return {success:false}
      default:
        return state
    }
  }
  export const  updateCategoryReducer  = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_UPDATE_REQUEST:
        return { loading: true }
      case CATEGORY_UPDATE_SUCCESS:
        return { loading: false, success: true}
      case CATEGORY_UPDATE_FAIL:
        return { loading: false, error: action.payload, success:false}
      case CATEGORY_UPDATE_RESET:
        return {success:false}
      default:
        return state
    }
  }

  