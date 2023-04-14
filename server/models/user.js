// require mongoose module
const mongoose = require("mongoose")

/* -------------------------------------- MODEL -------------------------------------- */
const userSchema = new mongoose.Schema({ 
    first_name: {
        type: String, 
        required: true
    },
    last_name: {
        type: String, 
        required: true
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }, 
    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary', 'prefer not to say'],
        required: true,
    },
    language: {
        type: String,
    },
    dob: {
        type: Date
    },
    type: {
        type: String,
        enum: ['client', 'volunteer'],
        required: true,
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    status: {
        type: String,
        enum: ['busy', 'available'],
        default: 'available'
    },
    field: [{
        type: String,
        enum: ['mental health', 'physical health', 'social health', 'spiritual health', 'sleeping issue', 'eating issue', 'relationship issue', 'family issue', 'work issue', 'school issue', 'other']
    }],
    sessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    }],
})

const User = mongoose.model("User", userSchema) 

module.exports = User