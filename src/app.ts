import fastify from "fastify"
import { z } from "zod"
import { prisma } from "./lib/prisma"

export const app = fastify()

app.post("/users", async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  // função que valida o body da requisição com o zod. (.parse() retorna o body validado, se ocorrer erro ele emite o throw new Error com a mensagem de erro)
  const { name, email, password } = registerBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })

  return reply.status(201).send()
})
