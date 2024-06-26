import { Schema, model } from 'mongoose'
import {
  IJob,
  IBilboMDPDBJob,
  IBilboMDCRDJob,
  IBilboMDAutoJob,
  IBilboMDScoperJob
} from '../interfaces'

// Enum for step statuses
const stepStatusEnum = ['Waiting', 'Running', 'Success', 'Error']

// Schema for step status
const stepStatusSchema = new Schema({
  status: { type: String, enum: stepStatusEnum, default: 'Waiting' },
  message: { type: String, required: false }
})

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    uuid: { type: String, required: true },
    data_file: { type: String, required: true },
    status: {
      type: String,
      enum: ['Submitted', 'Pending', 'Running', 'Completed', 'Error'],
      default: 'Submitted'
    },
    time_submitted: { type: Date, default: () => new Date(Date.now()) },
    time_started: Date,
    time_completed: Date,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    steps: {
      pdb2crd: { type: stepStatusSchema, required: true },
      pae: { type: stepStatusSchema, required: true },
      autorg: { type: stepStatusSchema, required: true },
      minimize: { type: stepStatusSchema, required: true },
      initfoxs: { type: stepStatusSchema, required: true },
      heat: { type: stepStatusSchema, required: true },
      md: { type: stepStatusSchema, required: true },
      dcd2pdb: { type: stepStatusSchema, required: true },
      foxs: { type: stepStatusSchema, required: true },
      multifoxs: { type: stepStatusSchema, required: true },
      results: { type: stepStatusSchema, required: true },
      email: { type: stepStatusSchema, required: true },
      nersc_prepare_slurm_batch: { type: stepStatusSchema, required: false },
      nersc_submit_slurm_batch: { type: stepStatusSchema, required: false },
      nersc_job_status: { type: stepStatusSchema, required: false }
    }
  },
  {
    timestamps: true
  }
)

const bilboMdPDBJobSchema = new Schema<IBilboMDPDBJob>({
  pdb_file: { type: String, required: true },
  psf_file: { type: String, required: false },
  crd_file: { type: String, required: false },
  const_inp_file: { type: String, required: true },
  conformational_sampling: {
    type: Number,
    enum: [1, 2, 3, 4],
    default: 1
  },
  rg_min: { type: Number, required: true, min: 10, max: 100 },
  rg_max: { type: Number, required: true, min: 10, max: 100 }
})

const bilboMdCRDJobSchema = new Schema<IBilboMDCRDJob>({
  pdb_file: { type: String, required: false },
  psf_file: { type: String, required: true },
  crd_file: { type: String, required: true },
  const_inp_file: { type: String, required: true },
  conformational_sampling: {
    type: Number,
    enum: [1, 2, 3, 4],
    default: 1
  },
  rg_min: { type: Number, required: true, min: 10, max: 100 },
  rg_max: { type: Number, required: true, min: 10, max: 100 }
})

const bilboMdAutoJobSchema = new Schema<IBilboMDAutoJob>({
  pdb_file: { type: String, required: true },
  psf_file: { type: String, required: false },
  crd_file: { type: String, required: false },
  pae_file: { type: String, required: true },
  const_inp_file: { type: String, required: false },
  conformational_sampling: {
    type: Number,
    enum: [1, 2, 3, 4],
    default: 1
  },
  rg_min: { type: Number, required: false, min: 10, max: 100 },
  rg_max: { type: Number, required: false, min: 10, max: 100 }
})

const bilboMdScoperJobSchema = new Schema<IBilboMDScoperJob>({
  pdb_file: { type: String, required: true }
})

const Job = model<IJob>('Job', jobSchema)
const BilboMdPDBJob = Job.discriminator('BilboMdPDB', bilboMdPDBJobSchema)
const BilboMdCRDJob = Job.discriminator('BilboMdCRD', bilboMdCRDJobSchema)
const BilboMdJob = Job.discriminator('BilboMd', bilboMdCRDJobSchema)
const BilboMdAutoJob = Job.discriminator('BilboMdAuto', bilboMdAutoJobSchema)
const BilboMdScoperJob = Job.discriminator('BilboMdScoper', bilboMdScoperJobSchema)

export { Job, BilboMdJob, BilboMdPDBJob, BilboMdCRDJob, BilboMdAutoJob, BilboMdScoperJob }
