const app = require('./app');
const dotenv = require('dotenv');
const connectionDataBase = require('./config/database')
const configPaypal = require('./config/paypal')

process.on('uncaughtException', err =>{
    console.log(`Error: ${err.stack}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
})

dotenv.config({path: 'backend/config/config.env'})
connectionDataBase();
configPaypal();

const server = app.listen(process.env.PORT, () =>{
    console.log(`Server start at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

process.on('unhandledRejection', err =>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandle promise rejection");
    server.close(() => process.exit(1));
})