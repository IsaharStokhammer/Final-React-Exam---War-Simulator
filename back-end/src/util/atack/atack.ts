import { ILaunchedRocket } from "../../types/lounchedRocket";
import { IResource, IUser } from "../../types/user";
import missiles from "../../data/missiles.json";

export const launchAttack = (
  user: IUser,
  rocket: IResource,
  target: string
) => {
  const updatedResources = user.resources?.map((resource): IResource => {
    if (resource.name === rocket.name) {
      resource.amount -= 1;
    }
    return resource;
  });

  if (updatedResources) {
    user.resources = updatedResources;

  }
  const timeToHit = missiles.find(
    (missile) => missile.name === rocket.name
  )?.speed;
  if (!timeToHit) {
    throw new Error("Missile not found");
  }

  const newLounchedRocket: ILaunchedRocket = {
    name: rocket.name,
    timeToHit_in_sec: timeToHit,
    status: "Launched",
  };
  user.lounchedRockets?.push(newLounchedRocket);

  setTimeout(() => {
    let count = newLounchedRocket.timeToHit_in_sec * 100;
    const intervalId = setInterval(() => {
      console.log(count); // לשנות את הערך בדאטה בייס במקום לוג
      if (count <= 0) {
        clearInterval(intervalId);
        console.log(`${rocket.name} hit ${target}!`); // לשנות את הערך בדאטה בייס במקום לוג
      }
      count -= 100;
    }, 1000);
  }, 0);
  return user;
};
