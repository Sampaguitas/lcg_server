const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

SupplierSchema.path('_id').validate(_id => (/^[0-9A-F]{1}$/).test(_id), 'wrong Nr format');

module.exports= Supplier = mongoose.model('suppliers', SupplierSchema);