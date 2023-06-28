const Project = require("../models/Project");

// Método para enviar un empleado nuevo a la base de datos.
exports.createProject = async (req, res) => {

    try {

        let docSchema = {
            _id: req.body.__id,
            name: req.body._name,
            ownerID: req.body._ownerID,
            duration: {
                start: req.body._startDate,
                end: req.body._endDate
            },
            budget: req.body._budget,
            earnings: {
                expected: req.body._expectedEarnings,
                obtained: req.body._finalEarnings
            }
        };

        const project = new Project(docSchema);
        console.log(project);

        await project.save();

        res.send(project);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error creating the project :(');
    }

};

// Método para traer desde la base de datos todos los empleados y enviarlo hacia el frontend.
exports.getProject = async (req, res) => {

    try {

        const project = await Project.find({}).sort({ "duration.start": 1 });

        res.json(project);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error getting the employees :(');
    }

};

// Método para actualizar un documento de la base de datos con los datos traidos del frontend.
exports.updateProject = async (req, res) => {

    try {

        const { _name, _ownerID, _budget, _startDate, _endDate, _expectedEarnings, _finalEarnings } = req.body;

        let project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404).json({ msg: 'Project does not exist :(' });
        } else {

            project.name = _name;
            project.ownerID = _ownerID;
            project.budget = _budget;
            project.duration.start = _startDate;
            project.duration.end = _endDate;
            project.earnings.expected = _expectedEarnings;
            project.earnings.obtained = _finalEarnings;

            project = await Project.findOneAndUpdate({ _id: req.params.id }, project, { new: true });
            console.log(project);

            res.json(project);

        }

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error updating the project :(');
    }

};

// Método para traer desde la base de datos un único empleado y enviarlo hacia el frontend.
exports.getOneProject = async (req, res) => {

    try {

        let project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404).json({ msg: 'Project does not exist' });
        } else {

            res.json(project);

        }

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error getting the project :(');
    }

};

// Método para borrar un empleado de la base de datos.
exports.deleteOneProject = async (req, res) => {

    try {

        let project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404).json({ msg: 'Project does not exist' });
        } else {

            await Project.findOneAndRemove({ _id: req.params.id });

            res.json({ msg: 'Project deleted.' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error deleting the project :(');
    }

};