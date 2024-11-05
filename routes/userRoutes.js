const express = require('express');
const { registerUser, loginUser , getLogin } = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/',login )
router.post('/register', registerUser);
router.post('/login', loginUser);
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
