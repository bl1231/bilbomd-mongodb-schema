import { Schema, model } from 'mongoose'
import {
  IJob,
  IBilboMDPDBJob,
  IBilboMDCRDJob,
  IBilboMDAutoJob,
  IBilboMDScoperJob,
  IBilboMDAlphaFoldJob,
  IBilboMDSANSJob,
  IAlphaFoldEntity
} from '../interfaces'

// Enum for step statuses
const stepStatusEnum = ['Waiting', 'Running', 'Success', 'Error']

// Schema for step status
const stepStatusSchema = new Schema({
  status: { type: String, enum: stepStatusEnum, default: 'Waiting' },
  message: { type: String, required: false }
})

const alphaFoldEntitySchema = new Schema<IAlphaFoldEntity>({
  name: { type: String, required: true },
  sequence: { type: String, required: true },
  type: { type: String, required: true },
  copies: { type: Number, required: true }
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
      alphafold: { type: stepStatusSchema, required: false },
      pdb2crd: { type: stepStatusSchema, required: false },
      pae: { type: stepStatusSchema, required: false },
      autorg: { type: stepStatusSchema, required: false },
      minimize: { type: stepStatusSchema, required: false },
      initfoxs: { type: stepStatusSchema, required: false },
      heat: { type: stepStatusSchema, required: false },
      md: { type: stepStatusSchema, required: false },
      dcd2pdb: { type: stepStatusSchema, required: false },
      pdb_remediate: { type: stepStatusSchema, required: false },
      foxs: { type: stepStatusSchema, required: false },
      pepsisans: { type: stepStatusSchema, required: false },
      multifoxs: { type: stepStatusSchema, required: false },
      gasans: { type: stepStatusSchema, required: false },
      copy_results_to_cfs: { type: stepStatusSchema, required: false },
      results: { type: stepStatusSchema, required: false },
      email: { type: stepStatusSchema, required: false },
      nersc_prepare_slurm_batch: { type: stepStatusSchema, required: false },
      nersc_submit_slurm_batch: { type: stepStatusSchema, required: false },
      nersc_job_status: { type: stepStatusSchema, required: false },
      nersc_copy_results_to_cfs: { type: stepStatusSchema, required: false }
    }
  },
  {
    timestamps: true,
    id: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
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

const bilboMdAlphaFoldJobSchema = new Schema<IBilboMDAlphaFoldJob>({
  fasta_file: { type: String, required: true },
  alphafold_entities: [alphaFoldEntitySchema],
  pdb_file: { type: String, required: false },
  psf_file: { type: String, required: false },
  crd_file: { type: String, required: false },
  pae_file: { type: String, required: false },
  const_inp_file: { type: String, required: false },
  conformational_sampling: {
    type: Number,
    enum: [1, 2, 3, 4],
    default: 1
  },
  rg_min: { type: Number, required: false, min: 10, max: 100 },
  rg_max: { type: Number, required: false, min: 10, max: 100 }
})

const bilboMdSANSJobSchema = new Schema<IBilboMDSANSJob>({
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
  rg_max: { type: Number, required: true, min: 10, max: 100 },
  d2o_fraction: { type: Number, required: true },
  deuteration_fractions: {
    type: Schema.Types.Mixed,
    required: true
  }
})

const bilboMdScoperJobSchema = new Schema<IBilboMDScoperJob>({
  pdb_file: { type: String, required: true }
})

const Job = model<IJob>('Job', jobSchema)
const BilboMdPDBJob = Job.discriminator('BilboMdPDB', bilboMdPDBJobSchema)
const BilboMdCRDJob = Job.discriminator('BilboMdCRD', bilboMdCRDJobSchema)
const BilboMdJob = Job.discriminator('BilboMd', bilboMdCRDJobSchema)
const BilboMdAutoJob = Job.discriminator('BilboMdAuto', bilboMdAutoJobSchema)
const BilboMdAlphaFoldJob = Job.discriminator(
  'BilboMdAlphaFold',
  bilboMdAlphaFoldJobSchema
)
const BilboMdSANSJob = Job.discriminator('BilboMdSANS', bilboMdSANSJobSchema)
const BilboMdScoperJob = Job.discriminator('BilboMdScoper', bilboMdScoperJobSchema)

export {
  Job,
  BilboMdJob,
  BilboMdPDBJob,
  BilboMdCRDJob,
  BilboMdAutoJob,
  BilboMdScoperJob,
  BilboMdAlphaFoldJob,
  BilboMdSANSJob
}
