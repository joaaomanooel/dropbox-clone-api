const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const { ...BoxController } = require('./controllers/box');
const { ...FileConotroller } = require('./controllers/file');

const router = Router();

router.post('/boxes', BoxController.store);
router.get('/boxes/:id', BoxController.show);
router.post('/boxes/:id/files', multer(multerConfig).single('file'), FileConotroller.store);

module.exports = router;
