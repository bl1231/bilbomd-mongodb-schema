import { Document, Types } from 'mongoose'
import { IJob } from './jobInterface'

interface IOtp {
  code: string
  expiresAt: Date
}

interface IConfirmationCode {
  code: string
  expiresAt: Date
}

interface IUser extends Document {
  username: string
  roles: string[]
  refreshToken: string[]
  email: string
  newEmail: string | null
  previousEmails: string[]
  status: string
  active: boolean
  confirmationCode: IConfirmationCode | null
  otp: IOtp | null
  UUID: string
  createdAt: Date
  updatedAt: Date
  last_access: Date
  jobs: IJob | null
}

export { IUser }
