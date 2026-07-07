import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'hard'],
      required: true,
    },
    estimatedMinutes: { type: Number, required: true, min: 5 },
    targetMuscles: [{ type: String, trim: true }],
    equipment: [{ type: String, trim: true }],
    coachTip: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Workout = model('Workout', workoutSchema);
