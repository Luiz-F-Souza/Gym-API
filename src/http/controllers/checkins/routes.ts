import { verifyJwt } from "@src/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";


export async function checkinRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/checkins/history', history)
  app.get('/checkins/metrics', metrics)

  app.post('/gyms/:gymId/checkins', create)
  app.patch('/checkins/:checkinId/validate', validate)
}