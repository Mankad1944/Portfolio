import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../data/customPortfolioData.json');

// Ensure data directory exists
const dataDir = path.dirname(dataFilePath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Helper to read persisted custom data
const getCustomData = () => {
  try {
    if (fs.existsSync(dataFilePath)) {
      const content = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading custom portfolio data:', err);
  }
  return null;
};

// Helper to save custom data
const saveCustomData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving custom portfolio data:', err);
    return false;
  }
};

// @route   GET /api/portfolio/data
// @desc    Get all current portfolio data (including edits)
router.get('/data', (req, res) => {
  const customData = getCustomData();
  return res.json({
    success: true,
    hasCustom: !!customData,
    data: customData,
  });
});

// @route   POST /api/portfolio/data
// @desc    Save/update full portfolio data from admin dashboard
router.post('/data', (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ success: false, error: 'No data provided' });
  }

  const saved = saveCustomData(data);
  if (saved) {
    return res.json({ success: true, message: 'Portfolio data updated successfully.' });
  } else {
    return res.status(500).json({ success: false, error: 'Failed to write portfolio data to disk.' });
  }
});

// @route   POST /api/portfolio/reset
// @desc    Reset custom data back to factory defaults
router.post('/reset', (req, res) => {
  try {
    if (fs.existsSync(dataFilePath)) {
      fs.unlinkSync(dataFilePath);
    }
    return res.json({ success: true, message: 'Portfolio reset to default successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
