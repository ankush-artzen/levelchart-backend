import express from 'express';
import {
  createStoreSettingController,
  getStoreSettingsController,
  getStoreSettingByIdController,
  updateStoreSettingController,
  deleteStoreSettingController,
} from '../controllers/store';

const router = express.Router();

// Define routes
router.post('/', createStoreSettingController); // Create a new store setting
router.get('/', getStoreSettingsController); // Get all store settings
router.get('/:id', getStoreSettingByIdController); // Get a store setting by ID
router.put('/:id', updateStoreSettingController); // Update a store setting by ID
router.delete('/:id', deleteStoreSettingController); // Delete a store setting by ID

export default router;
