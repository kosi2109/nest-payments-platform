export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    private password: string,
  ) {}

  checkPassword(password: string): boolean {
    return this.password === password;
  }
}
