const express = require('express');
const router = express.Router();
const testLvlController = require('../controllers/testLvl');
const logger = require('../middlewares/logger');
const auth = require('../middlewares/auth');


// Routes CRUD
router.get('/get', logger, auth, testLvlController.getTestLvlList);
router.get('/:id', logger, auth, testLvlController.getTestLvl); // GET = READ = LECTURE

router.post('/post', logger, auth, testLvlController.createTestLvl); // POST = CREATE = CREATION
router.put('/:id', logger, auth, testLvlController.updateTestLvl); // PUT = UPDATE = MODIFICATION
router.delete('/:id', logger, auth, testLvlController.deleteTestLvl); // DELETE = DELETE = SUPPRESSION


module.exports = router;