const express = require('express');
const { registerUser, loginUser, getLogin, getRegister, getHome } = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();
const User = require('../model/User');


router.get('/', getLogin)
router.get('/getregister', getRegister)
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getHome', getHome)

router.get('/users', auth, async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.put('/users/:id', auth, async (req, res) => {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, phone }, { new: true });
    res.json(user);
});

router.delete('/users/:id', auth, async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});

module.exports = router;
