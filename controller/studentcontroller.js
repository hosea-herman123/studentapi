const { default: mongoose } = require('mongoose');
const Student = require('../models/studentmodels');
const createError = require('http-errors');
// const express = require('express');
// const routes = express.Router();

module.exports = {
    addstudent:async (req, res) => {
        try {
                const student = new Student(req.body);
                const result = await student.save();
                res.send(result);
            } catch (error) {
                console.log(error.message);
                if(error.name === 'ValidationError') {
                    // res.status(400).send({error: error.message});
                    return next(createError(422, error.message));
                }
                next(error);
                // console.error('Error saving student:', error.message);
                // res.status(400).send({error: error.message});
                }
    },
    getstudent: async(req, res) => {
        try {
            const students = await Student.find({});
            res.send(students);
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error: 'Error fetching students'});
        }
        // res.send('get student');
    },
    getastudent: async(req, res, next) => {
        const id = req.params.id;
        try {
            const student = await Student.findById(id);
            if (!student) {
                return next(createError(404, 'Student not found'));
            }
            res.send(student);
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid student ID'));
                return;
            }
            next(error);
        }
    },
    updatestudent:async(req, res, next) => {
        try {
                const id = req.params.id;
                const updateData = req.body;
                const options = { new: true };
                const result = await Student.findByIdAndUpdate(id, updateData, options);
                if (!result) {
                    return next(createError(404, 'Student not found'));
                }
                res.send(result);
            } catch (error) {
                console.log(error.message);
                if(error instanceof mongoose.CastError) {
                    return next(createError(400, 'Invalid student ID'));
                }
                next(error);
            }
    },
    deletestudent:async(req, res, next) => {
        const id = req.params.id
        try {
                const student = await Student.findByIdAndDelete(id)
                if (!student) {
                    throw createError(404, 'Student not found');
                }
                res.send(student);
            } catch (error) {
                console.log(error.message);
                if(error instanceof mongoose.CastError) {
                    next(createError(400, 'Invalid student ID'));
                    return;
                }
                next(error);
            }
    }
}