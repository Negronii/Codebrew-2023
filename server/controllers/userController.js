const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')

// User registation. 
async function register(req, res) {
    // check if required attributes are provided
    const validationResult = validateUserAttributes(req.body);
    if (!validationResult.valid) {
        return res.status(400).json({ message: validationResult.errorMessage });
    }

    // Check if email is already in the database
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: "The email address you have entered is already associated with another account." });
    }

    // Set optional attributes to null if not provided
    const optionalAttributes = ['avatar', 'language', 'dob', 'latitude', 'longitude', 'field'];
    optionalAttributes.forEach(attr => {
        if (!req.body[attr]) {
            req.body[attr] = null;
        }
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    // Create new user
    user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        avatar: req.body.avatar,
        gender: req.body.gender,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
        language: req.body.language,
        dob: req.body.dob,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        field: req.body.field
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1d' });

    // Return user and token
    res.status(201).json({
        token: token,
        message: "success",
    })
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateUserAttributes(userAttributes) {
    const requiredAttributes = [
        { name: 'first_name', errorMessage: 'Please enter your first name.' },
        { name: 'last_name', errorMessage: 'Please enter your last name.' },
        { name: 'email', errorMessage: 'Please enter your email.', validator: validateEmail },
        { name: 'password', errorMessage: 'Please enter your password.', validator: validatePassword },
        { name: 'gender', errorMessage: 'Please enter your gender.', enum: ['male', 'female', 'non-binary', 'prefer not to say'] },
        { name: 'type', errorMessage: 'Please enter your type.' }
    ];

    for (const attribute of requiredAttributes) {
        const value = userAttributes[attribute.name];
        if (!value) {
            return { valid: false, errorMessage: attribute.errorMessage };
        }

        if (attribute.validator && !attribute.validator(value)) {
            return { valid: false, errorMessage: attribute.errorMessage };
        }

        if (attribute.enum && !attribute.enum.includes(value)) {
            return { valid: false, errorMessage: attribute.errorMessage };
        }
    }

    return { valid: true };
}

function validatePassword(password) {
    return password.length >= 8;
}

// User login
async function login(req, res) {
    // Find the user.
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: "The email address " + req.email + " is not associated with any account. Double-check your email address and try again." });
    }
    // validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: "Invalid email or password." });
    }
    // Generate JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1d' });
    // Return user and token
    res.status(200).json({
        token: token,
        message: "success",
    })
}

//export
module.exports = {
    register,
    login
}