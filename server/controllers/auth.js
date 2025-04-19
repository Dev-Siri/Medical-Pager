import { config as configureEnv } from "dotenv";
import { connect } from "getstream";
import bcrypt from "bcrypt";
import { StreamChat } from "stream-chat";
import crypto from "node:crypto";

configureEnv();

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_API_SECRET;
const APP_ID = process.env.STREAM_APP_ID;

export async function signup(req, res) {
  try {
    const { fullName, username, password, phoneNumber } = req.body;

    const userId = crypto.randomBytes(16).toString("hex");

    const serverClient = connect(API_KEY, API_SECRET, APP_ID);

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = serverClient.createUserToken(userId);

    res.status(200);

    return { token, fullName, username, userId, hashedPassword, phoneNumber };
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const serverClient = connect(API_KEY, API_SECRET, APP_ID);
    const client = StreamChat.getInstance(API_KEY, API_SECRET);

    const { users } = await client.queryUsers({ name: username });

    if (!users.length)
      return res.status(400).json({ message: "User not found" });

    const success = await bcrypt.compare(password, users[0].hashedPassword);

    const token = serverClient.createUserToken(users[0].id);

    if (!success) {
      res.status(500);
      return { message: "Incorrect password" };
    }

    res.status(200);
    return {
      token,
      fullName: users[0].fullName,
      username,
      userId: users[0].id,
    };
  } catch (error) {
    console.log(error);

    res.status(500);
    return { message: error };
  }
}
