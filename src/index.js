const express = require ('express');
const morgan = require ('morgan');
const path = require('path')

const { mongoose } = require('./database');

const app = express()



// Settings
app.set('port', process.env.PORT || 3000 )      // para que utilice el puerto que le da el servidor o el puerto 3000 (esto ulitmo es para cuando estas desarrolando)
//el app.set es para definir la variale en este caso con nombre port luego el app.get es para usarla

//Middlewares
app.use(morgan('dev')); // puedo ver las peticiones del servidor en consola
app.use(express.json());    //es para poder utilizar datos que vienen como JSON, desde el servidor o desde react los datos vienen como JSON por esto es importante

//Routes
app.use('/api/tasks', require('./routes/task.routes'))

//Static files


app.use(express.static(path.join(__dirname, 'public')))
// la carpeta public es de donde express va a levantar los archivos html
// path.join(__dirname, 'public') esta dando la direccion de la carpeta donde esta el html

// Starting the server

app.listen(app.get('port'), () => {
    console.log(`Server on port ${'port'}`)
})