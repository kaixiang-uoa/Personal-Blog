import express from 'express';
import { getSupportedLanguages, getTranslations } from '../utils/i18n.js';

const router = express.Router();

// get supported languages list
router.get('/languages', (req, res) => {
  res.json({
    success: true,
    data: getSupportedLanguages(),
  });
});

// get all translations of a specific language
router.get('/translations/:lang', (req, res) => {
  const lang = req.params.lang;
  res.json({
    success: true,
    data: getTranslations(lang),
  });
});

export default router;
