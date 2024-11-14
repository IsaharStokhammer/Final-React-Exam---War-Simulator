import { ILaunchedRocket } from "../../types/lounchedRocket";
import { IResource, IUser } from "../../types/user";
import missiles from "../../data/missiles.json";
import UserModel from "../../models/UserModel";
import AttackModel from "../../models/AttackModel";

// פונקציה ראשית
export const launchAttack = async (
  user: IUser,
  rocket: IResource,
  target: string,
  addedAttack: any
): Promise<IUser> => {
  await updateUserResources(user, rocket);

  const timeToHit = getRocketTimeToHit(rocket.name);
  const newLaunchedRocket = createLaunchedRocket(rocket, timeToHit);

  user.lounchedRockets?.push(newLaunchedRocket);
  startCountdown(newLaunchedRocket, target, addedAttack);

  // עדכון DB עם הנתונים החדשים של המשתמש
  try {
    await UserModel.findOneAndUpdate(
      { userName: user.userName },
      { lounchedRockets: user.lounchedRockets, resources: user.resources }
    );
    console.log("User attack data updated successfully.");
  } catch (error) {
    console.error("Error updating user attack data:", error);
  }

  return user;
};

// מעדכן את הריסוסס[] של המשתמש אחרי ירי רקטה
const updateUserResources = async (user: IUser, rocket: IResource) => {
  try {
    const result = await UserModel.findOneAndUpdate(
      { userName: user.userName, "resources.name": rocket.name },
      {
        $inc: { "resources.$.amount": -1 },
        lounchedRockets: user.lounchedRockets,
      },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating user resources:", error);
  }
};

//  ומצא בגייסון את זמן הגעת הרקטה
const getRocketTimeToHit = (rocketName: string): number => {
  const timeToHit = missiles.find(
    (missile) => missile.name === rocketName
  )?.speed;
  if (!timeToHit) {
    throw new Error("Missile not found");
  }
  return timeToHit;
};

// יוצר אובייקט חדש של רקטה ששוגרה
const createLaunchedRocket = (
  rocket: IResource,
  timeToHit: number
): ILaunchedRocket => {
  return {
    name: rocket.name,
    timeToHit_in_sec: timeToHit,
    status: "Launched",
  };
};

// מפעיל טיימר שמעדכן את מצב הרקטה עד לפגיעה
const startCountdown = (
  launchedRocket: ILaunchedRocket,
  target: any,
  addedAttack: any
): void => {
  let count = launchedRocket.timeToHit_in_sec * 1000;
  const intervalId = setInterval(() => {
    // לשנות את הערך בדאטה בייס במקום לוג
    console.log(`Countdown: ${count / 1000} seconds remaining`);
    if (count <= 0) {
      clearInterval(intervalId);
      console.log(`${launchedRocket.name} hit ${target}!`);
      //הסוקט אמור לעשות את זה
      // לעדכן את המצב ולהוסיף למקרה שהפגיעה נכשלה
      // AttackModel.findOneAndUpdate(
      //   { _id: addedAttack._id },
      //   { status: "Hit" }
      // );
    }
    count -= 1000;
  }, 1000);
};
