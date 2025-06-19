const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Required for hashing
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    }
});

// Hashing the password before saving in the database
// This function will be called before saving the user
userSchema.pre('save', async function (next) {
    try {
        // Only hash if password is new or modified
        if (!this.isModified('password')) return next();

        const salt = await bcrypt.genSalt(10); // generate salt
        const hashedPwd = await bcrypt.hash(this.password, salt); // hash password
        this.password = hashedPwd; // replace plain password with hashed
        next();
    } catch (error) {
        next(error); // pass error to the next middleware
    }
});

module.exports = mongoose.model('User', userSchema);