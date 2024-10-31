import { Hono } from "hono";
import userRoutes from "./users";

export const routes = (app: Hono) => {
  // custom middleware example
  // app.get('/', hello(), c => c.json({ 1: 'Hello', 2: 'World' }))

  app.route("/mausers", userRoutes);
};