const express = require('express');
const router = express.Router();

const {
    newCategory, 
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require('../controllers/category.Controller');

const {
    isAuthenticatedUser,
    authorizeUserRole
} = require("../middlewares/authenticate.middleware");

//User
router.route("/categories").get(getCategories);
router.route("/category").get(getCategory);

//Admin
router.route("/admin/categories/new").post(newCategory);
router.route("/admin/categories/:id")
    .put(isAuthenticatedUser, authorizeUserRole('admin'), updateCategory)
    .delete(isAuthenticatedUser, authorizeUserRole('admin'), deleteCategory);

module.exports = router;