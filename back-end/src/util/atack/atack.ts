import { ILaunchedRocket } from "../../types/lounchedRocket";
import { IResource, IUser } from "../../types/user";
import missiles from "../../data/missiles.json";
import UserModel from "../../models/UserModel";

// מעדכן את הריסורסס של יוזר לאחר ירי
const updateUserResources = (
  user: IUser,
  rocket: IResource
): IResource[] | undefined => {
  return user.resources?.map((resource): IResource => {
    if (resource.name === rocket.name) {
      resource.amount -= 1;
    }
    return resource;
  });
};

// מאחזר את זמן ההגעה של רקטה למטרה על פי שם בחיפוש בגייסון
const getRocketTimeToHit = (rocketName: string): number => {
  const timeToHit = missiles.find(
    (missile) => missile.name === rocketName
  )?.speed;
  if (!timeToHit) {
    throw new Error("Missile not found");
  }
  return timeToHit;
};

// יוצר אובייקט חדש של רקטה שנשלחה
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
  target: string
): void => {
  let count = launchedRocket.timeToHit_in_sec * 100;
  const intervalId = setInterval(() => {
    console.log(count); // לשנות את הערך בדאטה בייס במקום לוג
    if (count <= 0) {
      clearInterval(intervalId);
      console.log(`${launchedRocket.name} hit ${target}!`); // לשנות את הערך בדאטה בייס במקום לוג
    }
    count -= 100;
  }, 1000);
};

// פונקציה ראשית - משגרת התקפה ומטפלת בכל השלבים
export const launchAttack = (
  user: IUser,
  rocket: IResource,
  target: string
): IUser => {
  const updatedResources = updateUserResources(user, rocket);
  if (updatedResources) {
    user.resources = updatedResources;
  }

  const timeToHit = getRocketTimeToHit(rocket.name);
  const newLaunchedRocket = createLaunchedRocket(rocket, timeToHit);

  user.lounchedRockets?.push(newLaunchedRocket);
  startCountdown(newLaunchedRocket, target);
  UserModel.findOneAndUpdate(
    { userName: user.userName },
    { lounchedRockets: user.lounchedRockets }
  ).then((result) => console.log(result)); 
  return user;
};
