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

interface IAPIToken {
  tokenHash: string
  label?: string
  createdAt: Date
  expiresAt?: Date
}

interface IUser extends Document {
  _id: Types.ObjectId
  username: string
  roles: string[]
  refreshToken: string[]
  apiTokens: IAPIToken[]
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
  jobs: IJob[] | null
  jobCount: number
  jobTypes: Map<string, number>
}

export { IUser, IAPIToken }
