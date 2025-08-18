/**
 * Populate post query with related data
 *
 * Optimized to use field projection to reduce data transfer
 * and improve query performance
 *
 * @param {Object} query - Mongoose query object
 * @param {Object} options - Configuration options
 * @returns {Object} Populated query
 */
export const populatePostQuery = (query, options = {}) => {
  const { includeContent = true, lean = false } = options;

  // Define base projection - always exclude large fields unless explicitly requested
  let projection = {};
  if (!includeContent) {
    projection.content = 0; // Exclude content if not needed
  }

  // Apply projection if any fields are excluded
  if (Object.keys(projection).length > 0) {
    query = query.select(projection);
  }

  // Populate related data with selective field projection
  query = query
    .populate("author", "username displayName avatar")
    .populate("categories", "name name_en name_zh slug")
    .populate("tags", "name slug");

  // Use lean option for better performance when appropriate
  if (lean) {
    query = query.lean();
  }

  return query;
};

/**
 * Populate post query for list views (optimized for listing)
 * Excludes large fields like content for better performance
 *
 * @param {Object} query - Mongoose query object
 * @returns {Object} Populated query optimized for lists
 */
export const populatePostListQuery = query => {
  return populatePostQuery(query, {
    includeContent: false,
    lean: true,
  });
};
