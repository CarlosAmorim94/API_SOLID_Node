import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  // função que valida o body da requisição com o zod. (.parse() retorna o body validado, se ocorrer erro ele emite o throw new Error com a mensagem de erro).
  const { name, email, password } = registerBodySchema.parse(request.body)

  // Faz um hash da senha, o número 6 é o número de rounds que o bcrypt vai usar para gerar o hash, hash em cima de hash 6x, quanto maior o número mais seguro, mas mais lento.
  const password_hash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })

  return reply.status(201).send()
}
