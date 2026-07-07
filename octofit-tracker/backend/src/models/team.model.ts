import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, trim: true },
    challengePoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Team = model('Team', teamSchema);
