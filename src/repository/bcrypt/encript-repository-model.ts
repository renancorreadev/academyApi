
export interface EncriptRepositoryModel {
  hash: (password: string, salt: number) => Promise<string>
}
