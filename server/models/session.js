// require mongoose module
const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
})