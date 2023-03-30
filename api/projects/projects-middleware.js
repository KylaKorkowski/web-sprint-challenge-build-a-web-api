const Project = require('../projects/projects-model');

module.exports = {
    validateProjectID,
    validateProjectInput
};

async function validateProjectID(req, res, next) {
    try {
        const project = await Project.get(req.params.id);
        if(!project) {
            res.status(404).json({ message: 'project not found' });
        } else {
            req.project = project;
            next()
        };
    } catch (err) {
        res.status(500).json({ message: 'there was a problem finding that project' });
    };
};

function validateProjectInput(req, res, next) { 
    const { name, description, completed } = req.body;
    // would be better to create a yup schema to handle this complex conditional stuff
    if(
        Object.keys(req.body).length !== 3 ||
        !name ||
        !name.trim() ||
        !description ||
        !description.trim()
    ) {
        res.status(400).json({ 
            message: 'please provide a valid name and description for this project' 
        });
    } else {
        req.completed = completed;
        req.name = name.trim();
        req.description = description.trim();
        next();
    }
};