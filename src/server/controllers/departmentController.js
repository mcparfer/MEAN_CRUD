const Department = require("../models/Department");

// Método para enviar un departamento nuevo a la base de datos.
exports.createDepartment = async (req, res) => {

    try {

        let docSchema = {
            _id: req.body.__id,
            name: req.body._name,
            contactInfo: req.body._contactInfo,
            shifts: req.body._shifts
        };

        const department = new Department(docSchema);

        await department.save();

        res.send(department);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error creating the department :(');
    }

};

// Método para traer todos los departmentos desde la base de datos y enivarlos hacia el frontend.
exports.getDepartment = async (req, res) => {

    try {

        const department = await Department.aggregate([
            {
                $lookup: {
                    from: "employees",
                    localField: "_id",
                    foreignField: "departmentID",
                    as: "employees"
                }
            }
        ]);

        res.json(department);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error getting the departments :(');
    }
};

// Método para actualizar un documento de la base de datos con los datos traidos del frontend.
exports.updateDepartment = async (req, res) => {

    try {

        const { _name, _contactInfo, _shifts } = req.body;

        let department = await Department.findById(req.params.id);

        if (!department) {
            res.status(404).json({ msg: 'Department does not exist :(' });
        } else {
            department.name = _name;
            department.contactInfo = _contactInfo;
            department.shifts = _shifts;

            department = await Department.findOneAndUpdate({ _id: req.params.id }, department, { new: true });

            res.json(department);
        };

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error updating the department :(');
    }

};

// Método para traer desde la base de datos un único departamento y enviarlo hacia el frontend.
exports.getOneDepartment = async (req, res) => {

    try {

        let department = await Department.findById(req.params.id);

        if (!department) {
            res.status(404).json({ msg: 'Department does not exist' });
        } else {
            res.json(department);
        };       


    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error getting the department :(');
    }

};

// Método para borrar un departamento de la base de datos.
exports.deleteOneDepartment = async (req, res) => {

    try {

        let department = await Department.findById(req.params.id);

        if (!department) {
            res.status(404).json({ msg: 'Department does not exist' });
        } else {
            await Department.findOneAndRemove({ _id: req.params.id });
            res.json({ msg: 'Department deleted.' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error deleting the department :(');
    }

};