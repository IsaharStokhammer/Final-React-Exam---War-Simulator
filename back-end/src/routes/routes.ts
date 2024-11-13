import { Router } from "express";
import { createUser, getAllUsers, login } from "../controllers/userController";
import { create4Users } from "../insert4exsampleUsers";
const router = Router();



router.route("/").get((req, res) => {
    res.send("Hello World!");
});
router.route("/create4").get(create4Users);

router.route("/users").get(getAllUsers);

router.route("/login").post(login);

router.route("/register").post(createUser);

export default router;

