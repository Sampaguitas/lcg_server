const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SizeSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    mm: {
        type: String,
        default: ""
    },
    inch: {
        type: String,
        default: ""
    }
});

SizeSchema.path('_id').validate(_id => (/^[0-9A-F]{3}$/).test(_id), 'wrong Nr format');

module.exports= Size = mongoose.model('sizes', SizeSchema);