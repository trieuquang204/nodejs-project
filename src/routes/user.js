const router = require('express').Router();

const user = require('../controllers/user');

// c1: 
// router.get('/', (req, res) => {
//   return res.send('User')
// })

// C2: Tách sang file controller 
router.get('/', user.getUsers)

module.exports = router;