import mongoose from 'mongoose';

import { Activity } from '../models/activity.model';
import { Leaderboard } from '../models/leaderboard.model';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';
import { Workout } from '../models/workout.model';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teamAId = new mongoose.Types.ObjectId();
    const teamBId = new mongoose.Types.ObjectId();
    const userAId = new mongoose.Types.ObjectId();
    const userBId = new mongoose.Types.ObjectId();
    const userCId = new mongoose.Types.ObjectId();

    await Team.insertMany([
      {
        _id: teamAId,
        name: 'Pulse Pioneers',
        city: 'Seattle',
        motto: 'Consistency beats intensity',
        challengePoints: 1240,
      },
      {
        _id: teamBId,
        name: 'Summit Sprinters',
        city: 'Denver',
        motto: 'Climb one rep at a time',
        challengePoints: 1095,
      },
    ]);

    await User.insertMany([
      {
        _id: userAId,
        username: 'mila_runs',
        email: 'mila.runs@example.com',
        fullName: 'Mila Anderson',
        age: 29,
        fitnessLevel: 'advanced',
        teamId: teamAId,
      },
      {
        _id: userBId,
        username: 'leo_lifts',
        email: 'leo.lifts@example.com',
        fullName: 'Leo Martinez',
        age: 34,
        fitnessLevel: 'intermediate',
        teamId: teamAId,
      },
      {
        _id: userCId,
        username: 'nora_yoga',
        email: 'nora.yoga@example.com',
        fullName: 'Nora Patel',
        age: 27,
        fitnessLevel: 'intermediate',
        teamId: teamBId,
      },
    ]);

    await Activity.insertMany([
      {
        userId: userAId,
        teamId: teamAId,
        activityType: 'Run',
        durationMinutes: 48,
        caloriesBurned: 510,
        distanceKm: 9.2,
        completedAt: new Date('2026-07-05T07:30:00Z'),
        notes: 'Interval run around Green Lake',
      },
      {
        userId: userBId,
        teamId: teamAId,
        activityType: 'Strength Training',
        durationMinutes: 60,
        caloriesBurned: 430,
        completedAt: new Date('2026-07-05T18:00:00Z'),
        notes: 'Upper body push and pull split',
      },
      {
        userId: userCId,
        teamId: teamBId,
        activityType: 'Power Yoga',
        durationMinutes: 45,
        caloriesBurned: 290,
        completedAt: new Date('2026-07-06T06:15:00Z'),
        notes: 'Core flow and mobility work',
      },
    ]);

    await Leaderboard.insertMany([
      {
        userId: userAId,
        teamId: teamAId,
        score: 980,
        streakDays: 14,
        rank: 1,
        period: 'weekly',
      },
      {
        userId: userBId,
        teamId: teamAId,
        score: 860,
        streakDays: 10,
        rank: 2,
        period: 'weekly',
      },
      {
        userId: userCId,
        teamId: teamBId,
        score: 815,
        streakDays: 9,
        rank: 3,
        period: 'weekly',
      },
    ]);

    await Workout.insertMany([
      {
        title: 'HIIT Cardio Blast',
        category: 'Cardio',
        difficulty: 'hard',
        estimatedMinutes: 30,
        targetMuscles: ['full body'],
        equipment: ['jump rope', 'dumbbells'],
        coachTip: 'Keep rest windows short for max conditioning.',
      },
      {
        title: 'Lower Body Strength Builder',
        category: 'Strength',
        difficulty: 'moderate',
        estimatedMinutes: 40,
        targetMuscles: ['glutes', 'hamstrings', 'quads'],
        equipment: ['barbell', 'bench'],
        coachTip: 'Focus on full range of motion on every rep.',
      },
      {
        title: 'Morning Mobility Flow',
        category: 'Mobility',
        difficulty: 'easy',
        estimatedMinutes: 20,
        targetMuscles: ['hips', 'shoulders', 'spine'],
        equipment: ['yoga mat'],
        coachTip: 'Breathe deeply and move with control.',
      },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
