const mongoose = require('mongoose');

// Schema de Mongoose
const ProjectSchema = mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        required: [true, 'Project ID is required.'],
        min: 100,
        max: 999
    },
    name: {
        type: String,
        required: [true, 'Project Name is required.']
    },
    ownerID: {
        type: String,
        required: [true, 'Project Owner ID is required.']
    },
    duration: {
        start: {
            type: Date,
            required: [true, 'Project Start Date is required.']
        },
        end: {
            type: Date,
            required: [true, 'Project End Date is required.']
        }
    },
    budget: {
        type: Number,
        required: [true, 'Project Budget is required.'],
        min: 500
    },
    earnings: {
        expected: {
            type: Number,
            required: [true, 'Project Expected Earnings are required.']
        },
        obtained: {
            type: Number
        }
    }
});

// Exportamos el schema y el nombre de la colección donde se almacenará.
module.exports = mongoose.model('projects', ProjectSchema);