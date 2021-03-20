export type Username = string
export type User = {
  username: Username
}
export type Users =
  | undefined
  | {
      [key: string]: User
    }
