export type User = {
    id: number
    email?: string
    first_name: string
    last_name: string
    avatar: string
    role: number
  }
  
  export enum Role {
    CTO = "cto",
    ADMIN = "admin",
    MEMBER = "member"
  }
  
  export type Admin = {
    id: number
    email: string
    username: string
    password: string
    role: Role
  }
  