import { getUsers } from "../db/users";
import express from "express";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).send(users);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
