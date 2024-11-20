import { Document } from 'mongoose'
import { IUser } from './userInterface'

type StepStatusEnum = 'Waiting' | 'Running' | 'Success' | 'Error'

interface IMultiJob extends Document {
  __t: 'MultiJob'
  title: string
  uuid: string
  bilbomd_uuids: string[]
  user: IUser
  status: StepStatusEnum
  time_submitted: Date
  time_started?: Date
  time_completed?: Date
  progress: number
}

export { IMultiJob }
