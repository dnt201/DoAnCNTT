const express = require('express');
const router = express.Router();

const {
    getBrand,
    newProduct, 
    getProducts, 
    deleteReview,
    updateProduct,
    deleteProduct,
    deleteMyReview,
    getSingleProduct,
    getProductReviews,
    createProductReview
} = require("../controllers/product.Controller");
const {
    isAuthenticatedUser,
    authorizeUserRole
} = require("../middlewares/authenticate.middleware");
const uploadImage = require("../middlewares/uploadImage.middleware");

//User
router.route("/products").get(getProducts);
router.route("/products/brands").get(getBrand);
router.route("/products/:id").get(getSingleProduct);
router.route("/review").post(isAuthenticatedUser, createProductReview);
router.route("/reviews")
    .get(isAuthenticatedUser, getProductReviews)
    .delete(isAuthenticatedUser, deleteMyReview);


//Admin
router.route("/admin/products/new")
    .post(isAuthenticatedUser, authorizeUserRole('admin'), newProduct);
router.route("/admin/products/:id")
    .put(isAuthenticatedUser, authorizeUserRole('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeUserRole('admin'), deleteProduct);
router.route("/admin/reviews")
    .delete(isAuthenticatedUser, authorizeUserRole('admin'), deleteReview)

module.exports = router;