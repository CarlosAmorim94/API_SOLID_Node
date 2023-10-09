import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { UsersRepository } from "../users-repository"

// Para tipar o data do create, é só passar o tipo do objeto que o prisma gerou para o model User, por isso o import do Prisma.

export class PrismaUsersRepositories implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
