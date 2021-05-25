const express = require('express')
const router = express.Router()
const groupController = require('../controllers/groups')
const songController = require('../controllers/song')
const userController = require("../controllers/user")
const passport = require('../auth/auth')

router.post('/group',passport.auth, groupController.saveGroup)
router.get('/groups', groupController.getGroups)
router.get('/group/:id', groupController.getGroup)
router.put('/group/:id', passport.auth, groupController.updateGroup)
router.delete('/group/:id', passport.auth, groupController.deleteGroup)

router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.get("/user", passport.auth, userController.userDetail)

router.get('/songs', songController.getSings)
router.post('/song', passport.auth, songController.saveSing)
router.get('/group/:id/songs', songController.getGroupSongs)

module.exports = router