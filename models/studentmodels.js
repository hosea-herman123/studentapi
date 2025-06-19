const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstnamee: {
        type: String,
        required: [true, 'First name is required']
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required']
    },
    gender: {
        type: String
    }
})
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;