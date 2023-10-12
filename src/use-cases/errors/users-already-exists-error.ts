export class UsersAlreadyExistsError extends Error {
  constructor() {
    super("Email already exists")
  }
}
