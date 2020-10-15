const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OtherSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

OtherSchema.path('_id').validate(_id => (/^[0-9A-F]{3}$/).test(_id), 'wrong Nr format');

module.exports= Other = mongoose.model('others', OtherSchema);