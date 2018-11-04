const mongoose = require('mongoose')

const news = new mongoose.Schema({
    title: String,
    content: String,
    contentText: String,
    img: String,
    author:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'adminUser'
    },
    type: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'category'
    },
    look_num: {
        type: Number,
        default: 0
    },
},{versionKey: false, timestamps: {createdAt: 'creata_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('news', news)