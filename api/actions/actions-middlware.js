const Action = require('./actions-model');
const Project = require('../projects/projects-model');

module.exports = { validateActionID, validateActionInput, validateProjectID,};

async function validateActionID(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }
    req.action = action;
    next();
  } catch (err) {
    res.status(500).json({ message: 'There was a problem finding that action' });
  }
}

function validateActionInput(req, res, next) {
  const { description, notes, completed } = req.body;
  if (!description || !description.trim() || description.length > 128 || !notes || !notes.trim()) {
    return res.status(400).json({
      message: 'Please provide a valid description, notes, and project_id for this action',
    });
  }
  req.completed = completed;
  req.description = description.trim();
  req.notes = notes.trim();
  next();
}

async function validateProjectID(req, res, next) {
  const { project_id } = req.body;
  if (!project_id) {
    return res.status(400).json({
      message: 'Please provide a valid description, notes, and project_id for this action',
    });
  }
  try {
    const project = await Project.get(project_id);
    if (!project) {
      return res.status(404).json({ message: `There is no project with id ${project_id}` });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'There was a problem finding that project' });
  }
}