import { combineReducers } from "redux"
import {
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
    userUpdatePasswordReducer,
    userListReducer,
    userDetailsReducer,
    userUpdateReducer,
    userDeleteReducer,
} from './userReducers'

import {
    allCategoryReducer,
    createCategoryReducer,
    deleteCategoryReducer,
    updateCategoryReducer,
}from    './categoryReducers'

import {
    productListReducer,
    productListBrandReducer,
    productDetailsReducer,
    productReviewCreateReducer,
    productReviewDeleteReducer,

    productCreateReducer,
    productDeleteReducer,
    productUpdateReducer,
} from './productReducers'

import {orderCreateReducer,

    orderListMyReducer,
    orderDetailsReducer,
    orderDeliverReducer,
    orderMyReducer,
    orderListReducer,
} from './orderReducers'

import {
    cartReducer
} from './cartReducers'

const rootReducer = combineReducers({
    //User
    userLogin:userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdatePassword: userUpdatePasswordReducer,
    userList: userListReducer,
    userDetail: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    //Category
    allCategory:allCategoryReducer,
    createCategory:createCategoryReducer,
    deleteCategory:deleteCategoryReducer,
    updateCategory:updateCategoryReducer,

    //product
    productList:productListReducer,
    productListBrand:productListBrandReducer,
    productDetails:productDetailsReducer,

    productReviewCreate:productReviewCreateReducer,
    productReviewDelete:productReviewDeleteReducer,

    productCreate:productCreateReducer,
    productDelete:productDeleteReducer,
    productUpdate:productUpdateReducer,

    //order
    orderCreate:orderCreateReducer,
    orderListMy:orderListMyReducer,
    orderMy:orderMyReducer,
    orderDetails:orderDetailsReducer,
    orderDeliver:orderDeliverReducer,
    orderList:orderListReducer,

    //cart
    cart: cartReducer,
})

export default rootReducer;