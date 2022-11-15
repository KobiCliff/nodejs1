const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String
}, { timestamps: true })

// setup the model
const user = mongoose.model("user", userSchema)
// export the model
module.exports = user