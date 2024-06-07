export interface HashPasswordServiceInterface {
  hashPassword(password: string): Promise<string>;
}