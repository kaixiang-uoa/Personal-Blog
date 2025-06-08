/**
 * unified pagination utility
 * provide consistent pagination parameter process and response format
 */

/**
 * extract pagination parameters from request
 * @param {Object} req - Express request object
 * @param {Object} options - configure options
 * @param {number} options.defaultPage - default page number, default is 1
 * @param {number} options.defaultLimit - default limit per page, default is 10
 * @param {number} options.maxLimit - max limit per page, default is 100
 * @returns {Object} processed pagination parameters
 */
export const getPaginationParams = (req, options = {}) => {
  const {
    defaultPage = 1,
    defaultLimit = 10,
    maxLimit = 100
  } = options;

  // extract pagination parameters from query parameters
  let { page, limit } = req.query;
  
  // convert to integer and apply default values and limits
  page = parseInt(page) || defaultPage;
  limit = parseInt(limit) || defaultLimit;
  
  // ensure page number is at least 1
  page = Math.max(1, page);
  
  // limit max limit per page
  limit = Math.min(maxLimit, Math.max(1, limit));
  
  // calculate the number of items to skip
  const skip = (page - 1) * limit;
  
  return {
    page,
    limit,
    skip
  };
};

/**
 * create pagination response object
 * @param {Object} params - pagination parameters
 * @param {number} params.page - current page number
 * @param {number} params.limit - limit per page
 * @param {number} params.total - total number of records
 * @param {Array} data - current page data
 * @returns {Object} standard pagination response object
 */
export const createPaginationResponse = ({ page, limit, total }, data) => {
  return {
    data,
    pagination: {
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      perPage: limit,
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1
    }
  };
};

/**
 * combined function: process pagination request and return standard response
 * @param {Object} req - Express request object
 * @param {Function} queryFn - query function, accepts (filter, options) parameters
 * @param {Function} countFn - count function, accepts (filter) parameters
 * @param {Object} filter - filter conditions
 * @param {Object} options - other query options
 * @param {Object} paginationOptions - pagination options
 * @returns {Promise<Object>} standard pagination response
 */
export const paginateResults = async (
  req, 
  queryFn,
  countFn,
  filter = {}, 
  options = {}, 
  paginationOptions = {}
) => {
  // get pagination parameters
  const { page, limit, skip } = getPaginationParams(req, paginationOptions);
  
  // add pagination to query options
  const queryOptions = {
    ...options,
    skip,
    limit
  };
  
  // execute data query and count query in parallel to improve performance
  const [data, total] = await Promise.all([
    queryFn(filter, queryOptions),
    countFn(filter)
  ]);
  
  // return standard response
  return createPaginationResponse({ page, limit, total }, data);
}; 