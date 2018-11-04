const mongoose = require('mongoose')

const adminUser = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    nickname: String,
    password: {
        type: String,
        required: true
    },
    avatar: String,
    desc: String,
    job: Number,
    Phone: String,
    sex: Number
},{versionKey: false, timestamps: {createdAt:'create_time', updatedAt:
    'update_time'}})

module.exports = mongoose.model('adminUser', adminUser)