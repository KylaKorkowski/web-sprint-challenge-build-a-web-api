const express = require('express');
const { validateProjectID, validateProjectInput } = require('./projects-middleware');
const Project = require('./projects-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.get();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateProjectID, async (req, res, next) => {
  try {
    const project = await Project.get(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
});

router.post('/', validateProjectInput, async (req, res, next) => {
  try {
    const newProject = await Project.insert({
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed,
    });
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', validateProjectID, validateProjectInput, async (req, res, next) => {
  try {
    const updatedProject = await Project.update(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed,
    });
    res.status(200).json(updatedProject);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', validateProjectID, async (req, res, next) => {
  try {
    const project = await Project.remove(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/actions', validateProjectID, async (req, res, next) => {
  try {
    const projectActions = await Project.getProjectActions(req.params.id);
    res.status(200).json(projectActions);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
