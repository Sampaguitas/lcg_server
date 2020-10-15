const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CdiSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

CdiSchema.path('_id').validate(_id => (/^[0-9A-F]{1}$/).test(_id), 'wrong Nr format');

module.exports= Cdi = mongoose.model('cdis', CdiSchema);