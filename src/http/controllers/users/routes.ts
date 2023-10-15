import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJwt } from "src/http/middlewares/verify-jwt";
import { refreshToken } from "./refreshToken";



export async function usersRoutes (app: FastifyInstance) {


  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refreshToken)
  
  // ROTAS AUTENTICADAS
  app.get('/me', {onRequest: [verifyJwt]} ,profile)

}