import { Document } from 'mongoose'
import { IUser } from './userInterface'
import { IJob, IBilboMDSteps, INerscInfo } from './jobInterface'

type JobStatusEnum = 'Submitted' | 'Pending' | 'Running' | 'Completed' | 'Error'

interface IMultiJob extends Document {
  __t: 'MultiJob'
  title: string
  uuid: string
  bilbomd_uuids: string[]
  data_file_from: string
  user: IUser
  status: JobStatusEnum
  time_submitted: Date
  time_started?: Date
  time_completed?: Date
  progress: number
  bilbomd_jobs?: IJob[]
  steps: IBilboMDSteps
  nersc?: INerscInfo
}

export { IMultiJob }
