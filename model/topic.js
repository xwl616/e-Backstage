const mongoose = require('mongoose')

const topic = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'adminUser'
    },
    content: {
        type: String,
        required: true
    },
    common: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'common'
        }
    ]
},{versionKey: false, timestamps: {createdAt: 'creata_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('topic', topic)