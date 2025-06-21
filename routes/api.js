const express = require('express');
const routes = express.Router();
const Student = require('../models/studentmodels');
const studentcontroller = require('../controller/studentcontroller');
const {verifyAccessToken} = require('../helpers/jwtHelpers');


routes.post('/addstudent',studentcontroller.addstudent );

routes.get('/getstudent',studentcontroller.getstudent );

routes.get('/getstudent/:id',verifyAccessToken,studentcontroller.getastudent );

routes.patch('/updatestudent/:id',verifyAccessToken,studentcontroller.updatestudent );

routes.delete('/deletestudent/:id',verifyAccessToken,studentcontroller.deletestudent );

module.exports = routes;