import { Hono } from "hono";
import { v4 as uuidv4 } from "uuid";
import { stream, streamText } from "hono/streaming";
//import { getUsers, getUser, updateUser, deleteUser } from "./handlers";

import { getUsers } from "./handlers";
const userRoutes = new Hono()
  .get("/1", () => getUsers())
  .get("/5555", (c) => c.text("this is post"));
//.get("/:id", ({ param: { id } }) => getUser(id))

export default userRoutes;
