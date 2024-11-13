import { Router } from "express";
import { createUser, getAllUsers, login } from "../controllers/userController";
import { create4Users } from "../insert4exsampleUsers";
import { launchAttack } from "../util/atack/atack";
import { attack } from "../controllers/enemyController";
const router = Router();



router.route("/").get((req, res) => {
    res.send("Hello World!");
});
router.route("/create4").get(create4Users);

router.route("/users").get(getAllUsers);

router.route("/login").post(login);

router.route("/register").post(createUser);

router.route("/attack").get(attack)

export default router;

