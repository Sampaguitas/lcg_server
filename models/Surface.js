const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurfaceSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

SurfaceSchema.path('_id').validate(_id => (/^[0-9A-F]{2}$/).test(_id), 'wrong Nr format');

module.exports= Surface = mongoose.model('surfaces', SurfaceSchema);