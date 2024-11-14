import {
  addAttackToDB,
  getRocketTimeToHit,
} from "../controllers/enemyController";
import UserModel from "../models/UserModel";
import { ICreateAttackDTO } from "./socketDTOs";

export const createAttackSocket = async (data: ICreateAttackDTO) => {
  const { userName, rocket, target_room } = data;
  try{

  
  const user = await UserModel.findOne({ userName: userName });
  //בדיקה שהיוזר קיים
  if (!user) {
    throw new Error("User not found");
  };
  //בדיקה אם יש ליוזר מספיק אמאונט לרקטה בשם כזה
  if (!user.resources) {
    throw new Error("User has no resources");
  };
  const rocketResource = user.resources.find(
    (resource) => resource.name === rocket
  );
  if (!rocketResource) {
    throw new Error("Rocket not found");
  };
  //הוספת אטאק לDB
  const newAttackId = await addAttackToDB(
    userName,
    target_room,
    await getRocketTimeToHit(rocket)
  );
  //החסרת האמאונט של היוזר
  UserModel.findOneAndUpdate(
    { userName: userName, "resources.name": rocket },
    { $inc: { "resources.$.amount": -1 } }
  );

  return newAttackId;
}
catch(error){
  console.error(error);
}
};
