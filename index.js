const express = require('express');
const students_routes = require('./routes/api');
const user_routes = require('./routes/userroutes');
require('dotenv').config();
require('./helpers/init_mongodb')
const app = express();
app.use(express.json());
app.use(students_routes);
app.use(user_routes);


//Handling 404 Error
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404
    next(err)
})
//Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
})

const PORT = process.env.PORT || 4000;
app.listen(process.env.port || 4000, function() {
    console.log('Now listening for requests on: http://localhost:4000');
});