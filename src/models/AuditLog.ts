import { Schema, model, Document, Types } from "mongoose";

export enum AuditAction {
  DELETE_USER = "delete_user",
  CHANGE_ROLE = "change_role",
}

export interface IAuditLog extends Document {
  action: AuditAction;
  performedBy: Types.ObjectId;
  targetUser?: Types.ObjectId;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    action: {
      type: String,
      enum: Object.values(AuditAction),
      required: true,
    },
    performedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const AuditLog = model<IAuditLog>("AuditLog", auditLogSchema);