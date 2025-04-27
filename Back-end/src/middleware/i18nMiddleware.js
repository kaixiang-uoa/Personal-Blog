// 国际化中间件
export const i18nMiddleware = (req, res, next) => {
  // 从请求头、查询参数或cookie中获取语言
  const lang = req.headers['accept-language'] || req.query.lang || req.cookies.lang || 'en';
  
  // 支持的语言列表
  const supportedLanguages = ['en', 'zh'];
  
  // 提取主要语言代码 (例如 'en-US' -> 'en')
  const primaryLang = lang.split('-')[0].toLowerCase();
  
  // 检查是否支持该语言，如果不支持则使用默认语言
  req.lang = supportedLanguages.includes(primaryLang) ? primaryLang : 'en';
  
  // 将语言信息添加到响应本地变量中，以便在控制器中使用
  res.locals.lang = req.lang;
  
  // 如果是通过查询参数设置语言，则保存到cookie中
  if (req.query.lang && supportedLanguages.includes(req.query.lang)) {
    res.cookie('lang', req.query.lang, { 
      maxAge: 365 * 24 * 60 * 60 * 1000, // 一年有效期
      httpOnly: true,
      sameSite: 'strict'
    });
  }
  
  next();
};