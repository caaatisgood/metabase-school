interface Database {
  name: string
  id: number
}

export interface Databases extends Array<Database> {}
