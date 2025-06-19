const express = require('express');
const routes = express.Router();
const Student = require('../models/studentmodels');
const studentcontroller = require('../controller/studentcontroller');


routes.post('/addstudent',studentcontroller.addstudent );

routes.get('/getstudent',studentcontroller.getstudent );

routes.get('/getstudent/:id',studentcontroller.getastudent );

routes.patch('/updatestudent/:id',studentcontroller.updatestudent );

routes.delete('/deletestudent/:id',studentcontroller.deletestudent );

module.exports = routes;