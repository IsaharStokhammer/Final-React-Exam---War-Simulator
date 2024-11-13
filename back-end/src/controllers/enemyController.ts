import UserModel from "../models/UserModel";
import { Request, Response } from "express";
import { launchAttack } from "../util/atack/atack";

export const attack = async (req: Request, res: Response): Promise<void> => {
  const { userName, target, rocketName } = req.body;
  const user = await UserModel.findOne({ userName: userName });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  if (!user.resources) {
    res.status(404).json({ message: "User has no resources" });
    return;
  }
  const rocket = user.resources.find(
    (resource) => resource.name === rocketName
  );

  if (!rocket) {
    res.status(404).json({ message: "Rocket not found" });
    return;
  }
  const uptatedUser = launchAttack(user, rocket, target);

  UserModel.findOneAndUpdate({ userName: userName }, uptatedUser);

  res.status(200).json({ message: "Attack launched successfully" });
};
