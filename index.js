
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { dbConnection } = require('./db/config');


// console.log (process.env);

// Crear el servidor/ aplicacion de expres
const app = express();

// Conexion a la base de datos
dbConnection();


// Directorio Público
app.use(express.static('public'));

// CORS
app.use( cors() );

// Lectura y parseo del body
app.use(express.json());


// Rutas

app.use( '/api/auth', [] ,require('./routes/auth'))



app.listen( process.env.PORT, () => {
 console.log(`Servidor corriendo en puerto ${ process.env.PORT}`);
});
