import { PrismaUsersRepositories } from "@/repositories/prisma/prisma-users-repositories"
import { RegisterUseCase } from "../register"

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepositories()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
