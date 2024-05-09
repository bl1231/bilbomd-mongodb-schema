import { ObjectId, Document, Schema } from "mongoose";

interface IOtp {
  code: string;
  expiresAt: Date;
}

interface IConfirmationCode {
  code: string;
  expiresAt: Date;
}

interface IUser extends Document {
  username: string;
  roles: string[];
  refreshToken: Schema.Types.Array;
  email: string;
  status: string;
  active: boolean;
  confirmationCode: IConfirmationCode | null;
  otp: IOtp | null;
  UUID: string;
  createdAt: Date;
  last_access: Date;
  jobs: ObjectId;
}

export { IUser };
