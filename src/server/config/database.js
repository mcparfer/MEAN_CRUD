const mongoose = require('mongoose');

// Importamos la cadena de conexión de la base de datos mongo.
require('dotenv').config({ path: 'variables.env' }); 

// Conexión a la base de datos.
const connectDB = async () => {

    try {

        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('DB connected successfully!!');

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;