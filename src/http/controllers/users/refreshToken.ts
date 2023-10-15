import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { InvalidCretendialsError } from "@src/use-cases/errors/invalid-credentials-error"
import { makeAuthenticateUseCase } from "@src/use-cases/factories/make-authenticate-use-case"


export async function refreshToken(request: FastifyRequest, reply: FastifyReply) {


  await request.jwtVerify({
    onlyCookie: true
  })

  const userId = request.user.sub
  
  const token = await reply.jwtSign({}, {
    sign: {
      sub: userId,
    }
  })

  const refreshToken = await reply.jwtSign({}, {
    sign: {
      sub: userId,
      expiresIn: '7d'
    }
  })

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true
    })
    .status(200)
    .send({
      jwt: token
    })


}