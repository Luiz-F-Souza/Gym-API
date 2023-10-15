import { FastifyInstance } from "fastify";
import { register } from "./controllers/users/register";
import { authenticate } from "./controllers/users/authenticate";
import { profile } from "./controllers/users/profile";
import { verifyJwt } from "./middlewares/verify-jwt";
import { usersRoutes } from "./controllers/users/routes";
import { gymsRoutes } from "./controllers/gyms/routes";
import { checkinRoutes } from "./controllers/checkins/routes";



export async function appRoutes (app: FastifyInstance) {


  app.register(usersRoutes)
  app.register(gymsRoutes)
  app.register(checkinRoutes)

}