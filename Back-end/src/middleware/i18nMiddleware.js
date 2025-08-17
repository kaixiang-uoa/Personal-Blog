// i18n middleware
export const i18nMiddleware = (req, res, next) => {
  // get language from request header, query parameter or cookie
  const lang =
    req.headers['accept-language'] ||
    req.query.lang ||
    req.cookies.lang ||
    'en';

  // supported languages list
  const supportedLanguages = ['en', 'zh'];

  // extract primary language code (e.g. 'en-US' -> 'en')
  const primaryLang = lang.split('-')[0].toLowerCase();

  // check if language is supported, if not use default language
  req.lang = supportedLanguages.includes(primaryLang) ? primaryLang : 'en';

  // add language information to response local variable, so it can be used in controllers
  res.locals.lang = req.lang;

  // if language is set via query parameter, save to cookie
  if (req.query.lang && supportedLanguages.includes(req.query.lang)) {
    res.cookie('lang', req.query.lang, {
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      httpOnly: true,
      sameSite: 'strict',
    });
  }

  next();
};
