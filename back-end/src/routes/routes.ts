import { Router } from "express";
import {
  createUser,
  getAllUsers,
  login,
  userByToken,
} from "../controllers/userController";
import { create4Users } from "../insert4exsampleUsers";
import { launchAttack } from "../util/atack/atack";
import { attack, updateAttack } from "../controllers/enemyController";
import { getUserByToken } from "../util/general";
const router = Router();

router.route("/").get((req, res) => {
  res.send("Hello World!");
});
router.route("/create4").get(create4Users);

router.route("/users").get(getAllUsers);
router.route("/getUserByToken").get(userByToken);

router.route("/login").post(login);

router.route("/register").post(createUser);

router.route("/attack").get(attack);

router.route("/updateAttack").post(updateAttack);

export default router;
