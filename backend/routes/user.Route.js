const express = require('express');
const router = express.Router();

const {
    allUsers,
    loginUser,
    logoutUser,
    registerUser,
    resetPassword,
    getUserDetail,
    updateProfile,
    deleteProfile,
    forgotPassword,
    getUserProfile,
    updatePassword,
    activateAccount,
    updateUserProfile,
} = require('../controllers/user.Controller');

const {
    authorizeUserRole,
    isAuthenticatedUser,
} = require('../middlewares/authenticate.middleware');

router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

router.route('/register').post(registerUser);
router.route('/activate/:token').get(activateAccount);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/me/update').put(isAuthenticatedUser, updateUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

router.route('/admin/users').get(isAuthenticatedUser, authorizeUserRole('admin'), allUsers)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeUserRole('admin'), getUserDetail)
    .put(isAuthenticatedUser, authorizeUserRole('admin'), updateProfile)
    .delete(isAuthenticatedUser, authorizeUserRole('admin'), deleteProfile);

module.exports = router;