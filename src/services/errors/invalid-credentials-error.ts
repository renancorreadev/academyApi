
export class InvalidCredentialsError extends Error {
  constructor () {
    super('An Error occured in the authentication process')
    this.name = 'InvalidCredentialsError'
  }
}
