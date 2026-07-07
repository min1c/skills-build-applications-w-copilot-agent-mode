import express from 'express';

import './config/database';
import { Activity } from './models/activity.model';
import { Leaderboard } from './models/leaderboard.model';
import { Team } from './models/team.model';
import { User } from './models/user.model';
import { Workout } from './models/workout.model';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users/', async (_req, res) => {
  try {
    const users = await User.find().populate('teamId', 'name city').lean();
    res.status(200).json({ count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load users', error });
  }
});

app.get('/api/teams/', async (_req, res) => {
  try {
    const teams = await Team.find().sort({ challengePoints: -1 }).lean();
    res.status(200).json({ count: teams.length, data: teams });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load teams', error });
  }
});

app.get('/api/activities/', async (_req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ completedAt: -1 })
      .populate('userId', 'username fullName')
      .populate('teamId', 'name')
      .lean();
    res.status(200).json({ count: activities.length, data: activities });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load activities', error });
  }
});

app.get('/api/leaderboard/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ rank: 1 })
      .populate('userId', 'username fullName')
      .populate('teamId', 'name')
      .lean();
    res.status(200).json({ count: leaderboard.length, data: leaderboard });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load leaderboard', error });
  }
});

app.get('/api/workouts/', async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ estimatedMinutes: 1 }).lean();
    res.status(200).json({ count: workouts.length, data: workouts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load workouts', error });
  }
});

app.listen(port, () => {
  console.log(`Octofit backend listening on ${apiBaseUrl}`);
});
