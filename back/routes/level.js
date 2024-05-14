const express = require('express');
const router = express.Router();
const levelController = require('../controllers/level');
const logger = require('../middlewares/logger');
const auth = require('../middlewares/auth');


// Routes CRUD
router.get('/get', logger, auth, levelController.getLevelList);
router.get('/:id', logger, auth, levelController.getLevel); // GET = READ = LECTURE

router.post('/post', logger, auth, levelController.createLevel); // POST = CREATE = CREATION
router.put('/:id', logger, auth, levelController.updateLevel); // PUT = UPDATE = MODIFICATION
router.delete('/:id', logger, auth, levelController.deleteLevel); // DELETE = DELETE = SUPPRESSION


module.exports = router;