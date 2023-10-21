import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { compare } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}
interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    // buscar o usuário no banco de dados
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    // verificar se a senha está correta
    const doesPasswordMatchs = await compare(password, user.password_hash)

    if (!doesPasswordMatchs) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
