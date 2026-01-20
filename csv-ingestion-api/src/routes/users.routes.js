const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const upload = require("../middlewares/upload.middleware");

router.post("/upload-csv", upload.single("file"), userController.uploadCSV);

module.exports = router;
