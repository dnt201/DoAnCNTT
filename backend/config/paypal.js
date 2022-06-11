const paypal = require('paypal-rest-sdk');

const configPaypal = () => {
    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': process.env.PaypalClientID,
        'client_secret': process.env.PaypalSecretKey,
    });
}

module.exports = configPaypal;