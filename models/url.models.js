const mongoose = require('mongoose');

const URLschema = new mongoose.Schema({
    shortURL: {
        type: String,
        required: true,
        unique: true
    },
    realURL:{
        type: String,
        required: true,
    },
    visitHistory : [{timestamps: {type: Number}}],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users"
    }
    
},{timestamps:true})

const URL = mongoose.model('url',URLschema);

module.exports = URL;