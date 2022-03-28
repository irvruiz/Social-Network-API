const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thougtRoutes');
const friendsRoutes = require('./friendRoutes');
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/friends', friendsRoutes);
module.exports = router;
