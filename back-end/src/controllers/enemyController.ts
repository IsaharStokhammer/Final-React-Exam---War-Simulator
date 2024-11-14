import UserModel from "../models/UserModel";
import { Request, Response } from "express";
import { launchAttack } from "../util/atack/atack";
import AttackModel, { IAttack } from "../models/AttackModel";
import MissilesModel from "../models/MissilesModel";
import { IMissile } from "../types/misslies";

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
  const newAttackId : any= addAttackToDB(userName, target, await getRocketTimeToHit(rocketName));
  const uptatedUser = launchAttack(user, rocket, target, newAttackId);
  UserModel.findOneAndUpdate({ userName: userName }, uptatedUser);
  res.status(200).json({ message: "Attack launched successfully" });
};

//יצירת אטאק חדש בDB
export const addAttackToDB = async (
  userName: string,
  direction: string,
  timeToHit_in_sec: number
) => {
  const newAttack: IAttack = {
    attackerUserName: userName,
    direction: direction,
    timeToHit_in_sec: timeToHit_in_sec,
    status: "Launched",
  };
  try {
    const addedAttack = await AttackModel.create(newAttack);
    console.log("Attack added to DB:", addedAttack);
    return addedAttack._id;
  } catch (error) {
    console.error(error);
  }
};

export const getRocketTimeToHit = async (
  rocketName: string
): Promise<number> => {
  const missile = (await MissilesModel.findOne({
    name: rocketName,
  })) as IMissile | null;
  if (!missile) {
    throw new Error("Missile not found");
  }
  return missile.speed;
};

export const updateAttack = async (req: Request, res: Response): Promise<void> => {
  const { attackId, status } = req.body;
  const attack = await AttackModel.findById(attackId);
  if (!attack) {
    res.status(404).json({ message: "Attack not found" });
    return;
  }
  attack.status = status;
  await AttackModel.findByIdAndUpdate(attackId, attack);
  res.status(200).json({ message: "Attack updated successfully" });
};
