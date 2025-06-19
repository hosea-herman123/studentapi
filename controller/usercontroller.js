const { authSchema } = require('../helpers/validationschema');
const User = require('../models/usermodel');
const createError = require('http-errors');


module.exports = {
    // REGISTER FUNCTION
    register: async (req, res, next) => {
        try {
            const result = await authSchema.validateAsync(req.body);
            const { email } = result;

            const exists = await User.findOne({ email });
            if (exists) throw createError.Conflict(`${email} is already registered`);

            const user = new User(result);
            const savedUser = await user.save();

            res.send({ savedUser });
        } catch (error) {
            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    },

    // LOGIN FUNCTION
    login: async (req, res, next) => {
        try {
            const result = await authSchema.validateAsync(req.body);

            const user = await User.findOne({ email: result.email });
            if (!user) throw createError.NotFound('User not registered');

            // Match password
            const isMatch = await user.isValidPassword(result.password);
            if (!isMatch) throw createError.Unauthorized('Username/Password not valid');

            // Generate token
            const accessToken = await signAccessToken(user.id);
            // const refreshToken = await signRefreshToken(user.id); // Uncomment if needed

            res.send({ accessToken });
        } catch (error) {
            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    }
};