const express = require('express');
const router = express.Router()

// routes
const promptsRoute = require('./prompts');
const dataUpdateRoute = require('./dataupdate');

router.use('/prompts',promptsRoute)
router.use('/data',dataUpdateRoute)
module.exports = router



