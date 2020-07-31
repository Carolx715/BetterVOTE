const express = require('express');
const router = express.Router();

router.post('/register', register);
router.post('/authenticate', authenticate);

async function register(req, res) {
    
}

async function authenticate(req, res) {

}

module.exports = router;