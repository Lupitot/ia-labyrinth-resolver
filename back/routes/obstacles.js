const express = require('express');
const router = express.Router();
const obstaclesController = require('../controllers/obstacles');
const logger = require('../middlewares/logger');
const auth = require('../middlewares/auth');


// Routes CRUD
router.get('/get', logger, auth, obstaclesController.getObstacleList);
router.get('/:id', logger, auth, obstaclesController.getObstacle); // GET = READ = LECTURE

router.post('/post', logger, auth, obstaclesController.createObstacle); // POST = CREATE = CREATION
router.put('/:id', logger, auth, obstaclesController.updateObstacle); // PUT = UPDATE = MODIFICATION
router.delete('/:id', logger, auth, obstaclesController.deleteObstacle); // DELETE = DELETE = SUPPRESSION


module.exports = router;