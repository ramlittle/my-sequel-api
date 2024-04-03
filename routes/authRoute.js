const express = require('express');
const router = express.Router();
const path = require('path');
const {handleLogin, handleAuthenticate}=require('../controllers/authController.js')

router.post('/', (req, res) => {
    
});

module.exports = router;