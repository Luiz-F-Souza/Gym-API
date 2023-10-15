import { verifyJwt } from "@src/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";

export async function gymsRoutes(app: FastifyInstance){

  // MIDDLEWARE GLOBAL PARA ESSAS ROTAS
  app.addHook('onRequest', verifyJwt)


  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', create)
}