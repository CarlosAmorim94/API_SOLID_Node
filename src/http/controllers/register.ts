import { PrismaUsersRepositories } from "@/repositories/prisma/prisma-users-repositories"
import { RegisterUseCase } from "@/use-cases/register"
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

  const usersRepository = new PrismaUsersRepositories()
  const registerUseCase = new RegisterUseCase(usersRepository)

  try {
    await registerUseCase.execute({ name, email, password })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    return reply.status(400).send("Something went wrong")
  }

  return reply.status(201).send()
}
