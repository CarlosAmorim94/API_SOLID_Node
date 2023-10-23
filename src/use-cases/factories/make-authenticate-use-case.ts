import { PrismaUsersRepositories } from "@/repositories/prisma/prisma-users-repositories"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepositories()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
