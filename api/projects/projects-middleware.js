const Project = require('../projects/projects-model');
module.exports = { validateProjectID, validateProjectInput };

async function validateProjectID(req, res, next) {
  const project = await Project.get(req.params.id);
  if (project) {
    req.project = project;
    next();
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
}

function validateProjectInput(req, res, next) {
  const { name, description, completed } = req.body;
  if (!name || !description ||
      typeof name !== 'string' || typeof description !== 'string' ||
      typeof completed !== 'boolean') {
    res.status(400).json({ message: 'Please provide a valid name, description, and completed value for the project' });
  } else {
    req.completed = completed;
    req.name = name.trim();
    req.description = description.trim();
    next();
  }
}
