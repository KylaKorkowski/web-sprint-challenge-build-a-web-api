const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());

const {  } = require('./projects/projects-middleware');
const projectsRouter = require('./projects/projects-router');
server.use('/api/projects', projectsRouter);

const {  } = require('./actions/actions-middlware');
const actionsRouter = require('./actions/actions-router');
server.use('/api/actions', actionsRouter);

server.get('/api', (req, res) => {
    res.status(200).json({
        message: 'it bout to get krunk up in dis bitch.'
    })
})

module.exports = server;
