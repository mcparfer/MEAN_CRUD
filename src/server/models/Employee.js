const mongoose = require('mongoose');

// Schema de Mongoose
const EmployeeSchema = mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        required: [true, 'Employee ID is required.']
    },
    firstName: {
        type: String,
        required: [true, 'First Name is required.']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.']
    },
    departmentID: {
        type: Number,
        required: [true, 'Department ID is required.'],
        min: 100,
        max: 999
    },
    hireDate: {
        type: Date,
        required: [true, 'Hire Date is required.'],
    },
    extraRoles: {
        supervisor: {
            type: Boolean
        },
        manager: {
            type: Boolean
        }
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required.']
    }
});

// Exportamos el schema y el nombre de la colección donde se almacenará.
module.exports = mongoose.model('employees', EmployeeSchema);