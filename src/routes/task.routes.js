const express = require ('express');
const router = express.Router(); // este metodo permite ingresar rutas

const Task = require('../models/task')


router.get('/', async (req, res) => {           //le envio al cliente las tareas
    const tasks = await Task.find();            // el await se usa para tareas que van a demorar cierto 
    res.json(tasks)
});

router.get('/:id', async (req, res) => {            // le envio al cliente la tarea con el id requerido
    const task = await Task.findById(req.params.id);
    res.json(task);
})

router.post('/', async (req,res) => {
    const { title, description, observations} = req.body; // aca obtengo el dato que me da el cliente con req.body
    const task = new Task ({            
            title,              // el title sera igual al titulo q entregue el cliente
            description,         // la descrpision sera igual a la que da el cliente
            observations,
      })
    await task.save();          // aca estoy guardando en la base de datos el task que mando el cliente, como lleva tiempo esa tarea pongo el await
    res.json('Task Saved');
})

router.put('/:id', async (req, res) => {            // con esta funcion voy a actualizar una tarea
    const { title, description, observations } = req.body;
    const newTask = {title, description, observations}
    await Task.findByIdAndUpdate(req.params.id, newTask);      // req.params.id te da la id que ingreso el usario en la barra de direcciones, luego le digo que actualice la tarea q tiene esa id a NewTask
    res.json('Task Updated');
})

router.delete('/:id', async (req, res) => {             // para borrar la tarea que se encuentra en el id correspondiente
   await Task.findByIdAndRemove(req.params.id);
   res.json('Task Deleted')
})


module.exports = router;
