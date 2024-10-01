import { Schema, model } from 'mongoose'
import { IUser } from '../interfaces'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    roles: { type: [String], required: true, default: ['User'] },
    refreshToken: { type: [String], required: true, default: [] },
    email: {
      type: String,
      required: true,
      unique: true
    },
    newEmail: {
      type: String,
      required: false
    },
    previousEmails: { type: [String], required: false, default: [] },
    status: {
      type: String,
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },
    active: {
      type: Boolean,
      default: true
    },
    confirmationCode: {
      code: {
        type: String
      },
      expiresAt: {
        type: Date,
        expires: '2m',
        index: { expireAfterSeconds: 0 }
      }
    },
    otp: {
      code: {
        type: String
      },
      expiresAt: {
        type: Date
      }
    },
    UUID: {
      type: String
    },
    createdAt: Date,
    last_access: Date,
    jobs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Job'
      }
    ]
  },
  {
    timestamps: true
  }
)

const User = model<IUser>('User', userSchema)

export { User }
