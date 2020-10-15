const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HeatSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

HeatSchema.path('_id').validate(_id => (/^[0-9A-F]{2}$/).test(_id), 'wrong Nr format');

module.exports= Heat = mongoose.model('heats', HeatSchema);