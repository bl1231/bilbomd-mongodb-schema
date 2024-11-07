import { Document, Types } from 'mongoose'
import { IUser } from './userInterface'

type StepStatusEnum = 'Waiting' | 'Running' | 'Success' | 'Error'

interface IStepStatus {
  status: StepStatusEnum
  message: string
}

// Interface for steps status
interface IBilboMDSteps {
  alphafold?: IStepStatus
  pdb2crd?: IStepStatus
  pae?: IStepStatus
  autorg?: IStepStatus
  minimize?: IStepStatus
  initfoxs?: IStepStatus
  heat?: IStepStatus
  md?: IStepStatus
  dcd2pdb?: IStepStatus
  pdb_remediate?: IStepStatus
  foxs?: IStepStatus
  pepsisans?: IStepStatus
  multifoxs?: IStepStatus
  gasans?: IStepStatus
  copy_results_to_cfs?: IStepStatus
  results?: IStepStatus
  email?: IStepStatus
  nersc_prepare_slurm_batch?: IStepStatus
  nersc_submit_slurm_batch?: IStepStatus
  nersc_job_status?: IStepStatus
  nersc_copy_results_to_cfs?: IStepStatus
}

interface IAlphaFoldEntity {
  name: string
  sequence: string
  type: string
  copies: number
}

interface IFeedbackData {
  mw_saxs: number
  mw_model: number
  mw_err: number
  best_model: string
  overall_chi_square: number
  q_ranges: number[]
  chi_squares_of_regions: number[]
  residuals_of_regions: number[]
  mw_feedback: string
  overall_chi_square_feedback: string
  highest_chi_square_feedback: string
  second_highest_chi_square_feedback: string
  regional_chi_square_feedback: string
  timestamp: Date
}

interface INerscInfo {
  jobid: string
  state: string
  qos: string
  time_submitted: Date
  time_started?: Date
  time_completed?: Date
}

interface IJob extends Document {
  __t:
    | 'BilboMd'
    | 'BilboMdPDB'
    | 'BilboMdCRD'
    | 'BilboMdAuto'
    | 'BilboMdScoper'
    | 'BilboMdAlphaFold'
    | 'BilboMdSANS'
  title: string
  uuid: string
  status: string
  data_file: string
  time_submitted: Date
  time_started?: Date
  time_completed?: Date
  user: IUser
  steps: IBilboMDSteps
  progress: number
  feedback?: IFeedbackData
  nersc?: INerscInfo
}

interface IBilboMDPDBJob extends IJob {
  psf_file?: string
  crd_file?: string
  pdb_file: string
  const_inp_file: string
  conformational_sampling: number
  rg: number
  rg_min: number
  rg_max: number
}

interface IBilboMDCRDJob extends IJob {
  psf_file: string
  crd_file: string
  pdb_file?: string
  const_inp_file: string
  conformational_sampling: number
  rg: number
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
  rg?: number
  rg_min?: number
  rg_max?: number
}

interface IBilboMDAlphaFoldJob extends IJob {
  alphafold_entities: IAlphaFoldEntity[]
  fasta_file: string
  pdb_file?: string
  psf_file?: string
  crd_file?: string
  pae_file?: string
  const_inp_file?: string
  conformational_sampling: number
  rg?: number
  rg_min?: number
  rg_max?: number
}

interface IBilboMDSANSJob extends IJob {
  pdb_file: string
  psf_file?: string
  crd_file?: string
  const_inp_file: string
  conformational_sampling: number
  d2o_fraction: number
  rg: number
  rg_min: number
  rg_max: number
  deuteration_fractions: Map<string, number>
}

interface IBilboMDScoperJob extends IJob {
  pdb_file: string
}

export {
  IStepStatus,
  IBilboMDSteps,
  IAlphaFoldEntity,
  IFeedbackData,
  INerscInfo,
  IJob,
  IBilboMDPDBJob,
  IBilboMDCRDJob,
  IBilboMDAutoJob,
  IBilboMDAlphaFoldJob,
  IBilboMDSANSJob,
  IBilboMDScoperJob
}
