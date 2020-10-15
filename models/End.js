const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EndSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

EndSchema.path('_id').validate(_id => (/^[0-9A-F]{2}$/).test(_id), 'wrong Nr format');

module.exports= End = mongoose.model('ends', EndSchema);