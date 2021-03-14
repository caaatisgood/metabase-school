export type Headers = {
  [key: string]: string
}

export type Options = {
  headers?: Headers
  body?: Object
  method?: string
  [key: string]: any
}

export type Endpoint = string
