// add middlewares here related to actions
const Action = require('./actions-model');
const Project = require('../projects/projects-model');

module.exports = {
    validateActionID,
    validateActionInput,
    validateProjectID
};

async function validateActionID(req, res, next) {
    try {
        const action = await Action.get(req.params.id);
        if(!action) {
            res.status(404).json({ message: 'action not found' })
        } else {
            req.action = action;
            next();
        };
    } catch (err) {
        res.status(500).json({ message: 'there was a problem finding that action' });
    };
};

function validateActionInput(req, res, next) {
    const { description, notes, completed } = req.body;
    // would be better to create a yup schema to handle this complex conditional stuff
    if( // if req.body is malformed, res 400
        !description ||
        !description.trim() ||
        description.length > 128 ||
        !notes ||
        !notes.trim()
    ){
        res.status(400).json({ 
            message: 'please provide a valid description, notes, and project_id for this action'
        });
    } else { // else append description and notes to req
        req.completed = completed;
        req.description = description.trim();
        req.notes = notes.trim();
        next();        
    }
};

async function validateProjectID(req, res, next) {
    const { project_id } = req.body;
    if(!project_id) {
        res.status(400).json({
            message: 'please provide a valid description, notes, and project_id for this action'
        });
    } else {
        try {
            const project = await Project.get(req.body.project_id);
            if(!project) {
                res.status(404).json({ message: `there is no project with id ${project_id}` })
            } else {
                next()
            }
        } catch(err) {
            res.status(500).json({ message: 'there was a problem finding that project' });
        };
    }
};