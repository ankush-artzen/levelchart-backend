import { Request, Response } from 'express';
import { 
  createStoreSetting, 
  getStoreSettings, 
  getStoreSettingById, 
  updateStoreSetting, 
  deleteStoreSetting 
} from '../models/storeSetting';

// Create a new StoreSetting
export const createStoreSettingController = async (req: Request, res: Response): Promise<void> => {
  try {
    const newSetting = await createStoreSetting(req.body);
    res.status(201).json(newSetting);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create store setting', details: error });
  }
};

// Get all StoreSettings
export const getStoreSettingsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const settings = await getStoreSettings();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve store settings', details: error });
  }
};

// Get a StoreSetting by ID
export const getStoreSettingByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const setting = await getStoreSettingById(req.params.id);
    if (!setting) {
      res.status(404).json({ error: 'Store setting not found' });
      return;
    }
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve store setting', details: error });
  }
};

// Update a StoreSetting by ID
export const updateStoreSettingController = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedSetting = await updateStoreSetting(req.params.id, req.body);
    if (!updatedSetting) {
      res.status(404).json({ error: 'Store setting not found' });
      return;
    }
    res.status(200).json(updatedSetting);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update store setting', details: error });
  }
};

// Delete a StoreSetting by ID
export const deleteStoreSettingController = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSetting = await deleteStoreSetting(req.params.id);
    if (!deletedSetting) {
      res.status(404).json({ error: 'Store setting not found' });
      return;
    }
    res.status(200).json(deletedSetting);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete store setting', details: error });
  }
};
