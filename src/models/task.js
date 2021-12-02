const mongoose = require ('mongoose');
const { Schema } = mongoose; //el esquema me permite definir el esquema de los datos ej: (titulo, descpripcion...)

const TaskSchema = new Schema({
    title: {type: String, required: true},  // la propiedad titulo tendra datos de texto ('string') y no podra tener datos en blanco (por eso required:true)
    description: {type: String, required:true}
});

module.exports = mongoose.model('Task', TaskSchema); // aca estoy definiendo el model de como voy a usar los datos (los voy a usar con el esquema "TaskSchema")