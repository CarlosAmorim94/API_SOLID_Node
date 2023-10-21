import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    // Faz um hash da senha, o número 6 é o número de rounds que o bcrypt vai usar para gerar o hash, hash em cima de hash 6x, quanto maior o número mais seguro, mas mais lento.
    const password_hash = await hash(password, 6)

    // Procura se já existe um usuário com o email informado.
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
