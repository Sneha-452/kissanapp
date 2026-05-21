const router = require('express').Router();
const ensureAuthenticated = require('../Middleware/Auth');
const { getProfile, updateProfile } = require('../Controllers/profileController');

router.get('/', ensureAuthenticated, getProfile);
router.put('/', ensureAuthenticated, updateProfile);

module.exports = router;
