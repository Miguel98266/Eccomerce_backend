const express = require('express') // Importamos la libreria express
const app = express() // Inicializamos la libreria en una constante
const router= require('../routes') //Importamos las rutas
const serverless=require('serverless-http')
const cors=require('cors')

// Middlewares --> Obtienen los datos de la peticion antes de que lleguen a nuestra funcion 
app.use(express.json()) // Permitimos comunicacion a traves de formato JSON
app.use(express.urlencoded({extended:false})) // Permitimos recibir datos de codificacion de formularios

// Utilizamos las rutas
app.use(cors())
app.use(router)


app.listen(3000,(error)=>{
    error ? console.log(error) : console.log('Server running'); 
})
module.exports.handler = serverless(app)