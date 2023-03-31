const express = require('express');
const server = express();
server.use(express.json());

const projectsRouter = require('./projects/projects-router');
server.use('/api/projects', projectsRouter);

const actionsRouter = require('./actions/actions-router');
server.use('/api/actions', actionsRouter);

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal server error'
  });
});

server.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is up and running!'
  });
});

module.exports = server;
