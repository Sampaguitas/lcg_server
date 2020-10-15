const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LengthSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

LengthSchema.path('_id').validate(_id => (/^[0-9A-F]{3}$/).test(_id), 'wrong Nr format');

module.exports= Length = mongoose.model('lengths', LengthSchema);