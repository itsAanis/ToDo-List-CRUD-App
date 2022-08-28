
const {Router} = require('express')
const router = Router ()
const homeController = require("../controllers/homeController")
const Todos = require("../models/todotasks")


router.get('/', homeController.get_main)
router.post('/', homeController.post_main)
router.get("/edit/:id", homeController.get_edit)
router.put("/edit/:id", homeController.put_edit)
router.get("/remove/:id", homeController.get_delete)



module.exports = router