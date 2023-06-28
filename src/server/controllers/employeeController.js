const Employee = require("../models/Employee");

// Método para enviar un empleado nuevo a la base de datos.
exports.createEmployee = async (req, res) => {

    try {

        // Asignación de campos.
        let docSchema = {
            _id: req.body.__id,
            firstName: req.body._firstName,
            lastName: req.body._lastName,
            email: req.body._email,
            departmentID: req.body._departmentID,
            hireDate: req.body._hireDate,
            extraRoles: {
                supervisor: req.body._supervisor,
                manager: req.body._manager
            },
            salary: req.body._salary
        };

        // Creamos nuestro empleado bajo el schema de mongoose.
        const employee = new Employee(docSchema);
        console.log(employee);

        // Guardamos el empleado.
        await employee.save();

        // Enviamos la respuesta HTTP.
        res.send(employee);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error creating the employee :(');
    }
};

// Método para traer desde la base de datos todos los empleados y enviarlo hacia el frontend.
exports.getEmployee = async (req, res) => {

    try {

        // Trae todos los documentos de la base de datos.
        const employee = await Employee.find().sort( { "departmentID": 1 } );

        // Enviamos la constante convertida en un string JSON.
        res.json(employee);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error getting the employees :(');
    }
};

// Método para actualizar un documento de la base de datos con los datos traidos del frontend.
exports.updateEmployee = async (req, res) => {

    try {

        // Seleccionamos los campos que queramos actualizar del req.body que nos llega del frontend.
        const { _firstName, _lastName, _email, _departmentID, _hireDate, _supervisor, _manager, _salary } = req.body;

        // Busqueda del documento en la base de datos usando el id de la URL.
        let employee = await Employee.findById(req.params.id);

        // Si el ID no existe...
        if (!employee) {
            res.status(404).json({ msg: 'Employee does not exist :(' });
        } else {

            // Actualización del valor de los campos.
            employee.firstName = _firstName;
            employee.lastName = _lastName;
            employee.email = _email;
            employee.departmentID = _departmentID;
            employee.hireDate = _hireDate;
            employee.extraRoles.supervisor = _supervisor;
            employee.extraRoles.manager = _manager;
            employee.salary = _salary;

            // Actualización del nuevo documento cuyo _id coincida con el id de la URL.
            employee = await Employee.findOneAndUpdate({ _id: req.params.id }, employee, { new: true });
            console.log(employee);

            // Enviamos el parametro convertido en un string JSON.
            res.json(employee);

        }



    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error updating the employee :(');
    }

}

// Método para traer desde la base de datos un único empleado y enviarlo hacia el frontend.
exports.getOneEmployee = async (req, res) => {

    try {

        // Busqueda del documento en la base de datos usando el id de la URL.
        let employee = await Employee.findById(req.params.id);

        // Si el ID no existe...
        if (!employee) {
            res.status(404).json({ msg: 'Employee does not exist' });
        } else {

            // Enviamos el parametro convertido en un string JSON.
            res.json(employee);

        }

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error getting the employee :(');
    }

};

// Método para borrar un empleado de la base de datos.
exports.deleteOneEmployee = async (req, res) => {

    try {

        // Busqueda del documento en la base de datos usando el id de la URL.
        let employee = await Employee.findById(req.params.id);

        // Si el ID no existe...
        if (!employee) {
            res.status(404).json({ msg: 'Employee does not exist' });
        } else {

            // Si existe, borra aquel documento cuyo id coincida con el id de la URL.
            await Employee.findOneAndRemove({ _id: req.params.id });
            
            // Enviamos como respuesta un mensaje tipo JSON.
            res.json({ msg: 'Employee deleted.' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error deleting the employee :(');
    }

}