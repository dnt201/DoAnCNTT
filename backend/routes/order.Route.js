const express = require('express');
const router = express.Router();

const {
    myOrder,
    allOrder,
    newOrder,
    updateOrder,
    ViewMyOrder,
    getSingleOrder
} = require('../controllers/order.Controller')

const {
    isAuthenticatedUser,
    authorizeUserRole
} = require('../middlewares/authenticate.middleware');

router.route('/order/me').get(isAuthenticatedUser, myOrder);
router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, ViewMyOrder);

router.route('/admin/orders').get(isAuthenticatedUser, authorizeUserRole('admin'), allOrder);
router.route('/admin/order/:id')
    .get(isAuthenticatedUser, authorizeUserRole('admin'), getSingleOrder)
    .put(isAuthenticatedUser, authorizeUserRole('admin'), updateOrder);


module.exports = router;