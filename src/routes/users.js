const router = require("express").Router();
const passport = require("passport");
const UserController = require("../controllers/users.controller");

const userController = new UserController();

router.get("/users/signin", userController.renderSignin);
router.get("/users/signup", userController.renderSignup);
router.get("/users/logout", userController.logout);
router.post("/users/signup", userController.signUp);
router.post(
  "/users/signin",
  passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true,
  })
);

module.exports = router;
