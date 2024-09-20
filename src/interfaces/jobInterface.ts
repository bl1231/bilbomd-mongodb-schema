import { Document, Types } from 'mongoose'
import { IUser } from './userInterface'

interface IStepStatus {
  status: string
  message: string
}

// Interface for steps status
interface IBilboMDSteps {
  alphafold?: IStepStatus
  pdb2crd: IStepStatus
  pae: IStepStatus
  autorg: IStepStatus
  minimize: IStepStatus
  initfoxs: IStepStatus
  heat: IStepStatus
  md: IStepStatus
  dcd2pdb: IStepStatus
  foxs: IStepStatus
  multifoxs: IStepStatus
  copy_results_to_cfs?: IStepStatus
  results: IStepStatus
  email: IStepStatus
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

interface IJob extends Document {
  __t: 'BilboMd' | 'BilboMdPDB' | 'BilboMdCRD' | 'BilboMdAuto' | 'BilboMdScoper' | 'BilboMdAlphaFold'
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

interface IBilboMDAlphaFoldJob extends IJob {
  alphafold_entities: IAlphaFoldEntity[]
  fasta_file: string
  pdb_file?: string
  psf_file?: string
  crd_file?: string
  pae_file?: string
  const_inp_file?: string
  conformational_sampling: number
  rg_min?: number
  rg_max?: number
}

interface IBilboMDSANSJob extends IJob {
  pdb_file: string
  psf_file?: string
  crd_file?: string
  const_inp_file: string
  conformational_sampling: number
  rg_min: number
  rg_max: number
}

interface IBilboMDScoperJob extends IJob {
  pdb_file: string
}

export {
  IStepStatus,
  IBilboMDSteps,
  IAlphaFoldEntity,
  IJob,
  IBilboMDPDBJob,
  IBilboMDCRDJob,
  IBilboMDAutoJob,
  IBilboMDAlphaFoldJob,
  IBilboMDSANSJob,
  IBilboMDScoperJob
}
