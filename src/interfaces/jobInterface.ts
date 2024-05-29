import { Document, Types } from 'mongoose'
import { IUser } from './userInterface'

interface IStepStatus {
  status: string
  message: string
}

// Interface for steps status
interface IBilboMDSteps {
  pdb2crd: IStepStatus
  pae: IStepStatus
  autorg: IStepStatus
  minimize: IStepStatus
  heat: IStepStatus
  md: IStepStatus
  foxs: IStepStatus
  multifoxs: IStepStatus
  results: IStepStatus
  email: IStepStatus
  nersc_prepare_slurm_batch?: IStepStatus
  nersc_submit_slurm_batch?: IStepStatus
  nersc_job_status?: IStepStatus
}

interface IJob extends Document {
  __t: 'BilboMd' | 'BilboMdPDB' | 'BilboMdCRD' | 'BilboMdAuto' | 'BilboMdScoper'
  title: string
  uuid: string
  status: string
  data_file: string
  time_submitted: Date
  time_started?: Date
  time_completed?: Date
  user: IUser
  steps: IBilboMDSteps
}

interface IBilboMDPDBJob extends IJob {
  psf_file?: string
  crd_file?: string
  pdb_file: string
  const_inp_file: string
  conformational_sampling: number
  rg_min: number
  rg_max: number
}

interface IBilboMDCRDJob extends IJob {
  psf_file: string
  crd_file: string
  pdb_file?: string
  const_inp_file: string
  conformational_sampling: number
  rg_min: number
  rg_max: number
}

interface IBilboMDAutoJob extends IJob {
  pdb_file: string
  psf_file?: string
  crd_file?: string
  pae_file: string
  const_inp_file?: string
  conformational_sampling: number
  rg_min?: number
  rg_max?: number
}

interface IBilboMDScoperJob extends IJob {
  pdb_file: string
}

export {
  IStepStatus,
  IBilboMDSteps,
  IJob,
  IBilboMDPDBJob,
  IBilboMDCRDJob,
  IBilboMDAutoJob,
  IBilboMDScoperJob
}
