const express = require('express');
const connectDB = require('./config/database.js');
const cors = require('cors')

// Inicialización.
const app = express();

// Conexión a mongoDB.
connectDB();

// Middleware
app.use(cors()); // Permite la comunicación entre los diferentes puertos del backend y frontend.
app.use(express.json()); // Permite la entrada y alamcenamiento de documentos JSON en el servidor (métodos POST o PUT).

// Definimos las rutas web.
app.use('/api/employee', require('./routes/employee'));
app.use('/api/department', require('./routes/department'));
app.use('/api/project', require('./routes/project'));
app.use('/api/queries', require('./routes/queries'));

// Iniciamos el servidor en el puerto indicado.
app.listen(4000, () => console.log('Server started!'));