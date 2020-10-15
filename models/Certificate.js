const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CertificateSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

CertificateSchema.path('_id').validate(_id => (/^[0-9A-F]{1}$/).test(_id), 'wrong Nr format');

module.exports= Certificate = mongoose.model('certificates', CertificateSchema);