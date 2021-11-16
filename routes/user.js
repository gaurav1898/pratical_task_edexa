const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const permits = require('../handler/oauthorization');
const imageUpload = require('../handler/imageUpload');
router.post('/signup', imageUpload.upload.single('image'), UserController.Add);

router.post('/signin/:role',UserController.SignIn);

module.exports = router;