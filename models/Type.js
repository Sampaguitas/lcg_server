const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

TypeSchema.path('_id').validate(_id => (/^[0-9A-F]{3}$/).test(_id), 'wrong Nr format');

module.exports= Type = mongoose.model('types', TypeSchema);