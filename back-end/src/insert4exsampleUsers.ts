import mongoose from "mongoose";
import { IUser } from "./types/user";
import UserModel from "./models/UserModel";

const PORT = process.env.PORT;

export async function create4Users(req: any, res: any): Promise<void> {
  try {
    await mongoose.connect(
      "mongodb+srv://8526656:1WThE3gaYOUDeLta@cluster0.87rl3.mongodb.net/war-simulator?retryWrites=true&w=majority&appName=Cluster0"
    );

    // יצירת ארבע יוזרים
    const usersExample: IUser[] = [
      {
        userName: "yisa",
        password: "1234",
        location: "null",
        organization: "example",
      },
      {
        userName: "yisa2",
        password: "1234",
        location: "null",
        organization: "example",
      },
      {
        userName: "yisa3",
        password: "1234",
        location: "null",
        organization: "example",
      },
      {
        userName: "yisa4",
        password: "1234",
        location: "null",
        organization: "example",
      },
    ];

    await UserModel.insertMany(usersExample);
    console.log("Users created successfully");
  } catch (error) {
    console.error("Error creating candidates:", error);
  } finally {
    mongoose.connection.close();
    res.status(200).json({ message: "Users created successfully" });
  }
}
