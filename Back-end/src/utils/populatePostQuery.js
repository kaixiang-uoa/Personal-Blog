export const populatePostQuery = (query) =>
    query
      .populate('author', 'username displayName avatar')
      .populate('categories', 'name name_en name_zh slug')
      .populate('tags', 'name slug');
  