// Write your "projects" router here!
const express = require('express');
const {
    validateProjectID,
    validateProjectInput,
} = require('./projects-middleware');

const router = express.Router();

const Project = require('./projects-model');

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(next)
});

router.get('/:id', validateProjectID, (req, res, next) => {
    Project.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
});

router.post('/', validateProjectInput, (req, res, next) => {
    Project.insert({
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed,
    })
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
});

router.put('/:id', validateProjectID, validateProjectInput, (req, res, next) => {
    Project.update(req.params.id, {
        description: req.description,
        name: req.name,
        completed: req.completed,
    })
        .then(updatedProject => {
            res.status(200).json(updatedProject);
        })
        .catch(next)
});

router.delete('/:id', validateProjectID, (req, res, next) => {
    Project.remove(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
});

router.get('/:id/actions', validateProjectID, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'Something happened in projects-router',
        message: err.message,
        stack: err.stack
    })
});

module.exports = router;