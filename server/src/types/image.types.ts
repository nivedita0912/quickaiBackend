import { Document, Types } from "mongoose";

export interface IImage extends Document {
  imgType:
    | "restore"
    | "remove"
    | "fill"
    | "recolor"
    | "bgremove";

  transformation: string;

  publicId: string;

  user: Types.ObjectId;

  secureUrl: string;

  width?: number;

  height?: number;

  config?: Record<string, unknown>;

  aspectRatio?: string;

  color?: string;

  prompt: string;

  createdAt?: Date;

  updatedAt?: Date;
}