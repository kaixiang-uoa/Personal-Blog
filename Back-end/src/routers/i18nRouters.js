import express from 'express';
import { getSupportedLanguages, getTranslations } from '../utils/i18n.js';

const router = express.Router();

// 获取支持的语言列表
router.get('/languages', (req, res) => {
  res.json({
    success: true,
    data: getSupportedLanguages()
  });
});

// 获取指定语言的所有翻译
router.get('/translations/:lang', (req, res) => {
  const lang = req.params.lang;
  res.json({
    success: true,
    data: getTranslations(lang)
  });
});

export default router;