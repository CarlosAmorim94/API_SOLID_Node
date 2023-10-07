import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export const registerUseCase = async ({
  name,
  email,
  password,
}: RegisterUseCaseProps) => {
  // Faz um hash da senha, o número 6 é o número de rounds que o bcrypt vai usar para gerar o hash, hash em cima de hash 6x, quanto maior o número mais seguro, mas mais lento.
  const password_hash = await hash(password, 6)

  // Procura se já existe um usuário com o email informado. (.findUnique() retorna null se não encontrar nada)
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error("Email already in use")
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
