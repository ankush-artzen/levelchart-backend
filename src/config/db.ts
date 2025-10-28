import mongoose from 'mongoose';
import {logInfo, logDebug, logError } from '../services/logger';

export const connectToDatabase = async (dbUri: string): Promise<void> => {
  try {
    await mongoose.connect(dbUri);
    console.log('Database connection successful');
    logInfo("Database","Connection successful");
  } catch (error:any) {
    console.error('Database connection error:', error);
    logError("Database connection error:", error?.message);
    process.exit(1); // Exit the process with an error
  }
};
