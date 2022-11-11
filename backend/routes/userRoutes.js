const express = require("express");
const { registerUser, authUser, allUsers } = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// voi api la /api/user method post thi dung registerUser
router.post('/', registerUser)
router.route('/').get(protect, allUsers)
//voi api la /api/user/login method post thi dung authUser
router.post('/login', authUser )

module.exports = router;
