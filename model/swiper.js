const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const swiper = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    newsId: {
        type: ObjectId,
        ref: 'news',
        required: true
    },
    status: {
        type: Number,
        default: 1
    },
    sort: {
        type: Number,
        default: 1
    }
},{versionKey: false, timestamps: {createdAt: 'creata_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('swiper', swiper)