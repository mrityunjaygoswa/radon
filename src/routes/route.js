const express = require('express');
const externalModule = require('../logger/logger')
//const http = require('http')
const router = express.Router();

router.get('/test-me', function (req, res) { externalModule.swagat()
    
  //('My last api!')
});

module.exports = router;
// 
