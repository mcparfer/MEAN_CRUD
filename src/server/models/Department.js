const mongoose = require('mongoose');

// Schema de Mongoose
const DepartmentSchema = mongoose.Schema({
    _id: {
        type: Number,
        unique: true,
        required: [true, 'Department ID is required.']
    },
    name: {
        type: String,
        required: [true, 'Department Name is required.']
    },
    contactInfo: [{
        _id : false,
        number: {
            type: String
        },
        type: {
            type: String
        }
    }],
    shifts: {
        type: [String],
        required: [true, 'Department Shifts are required.']
    },
});

// Exportamos el schema y el nombre de la colección donde se almacenará.
module.exports = mongoose.model('departments', DepartmentSchema);