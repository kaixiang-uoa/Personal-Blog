# Blog API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## API Endpoints

### Posts
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/posts` | Get all posts | No |
| GET | `/posts/slug/:slug` | Get post by slug | No |
| GET | `/posts/:id` | Get post by ID | No |
| POST | `/posts` | Create new post | Yes (Admin) |
| PUT | `/posts/:id` | Update post | Yes (Admin) |
| DELETE | `/posts/:id` | Delete post | Yes (Admin) |

### Users
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | Yes (Admin) |
| GET | `/users/:id` | Get user by ID | Yes |
| POST | `/users` | Create new user | Yes (Admin) |
| PUT | `/users/:id` | Update user | Yes |
| DELETE | `/users/:id` | Delete user | Yes (Admin) |

### Categories
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/categories` | Get all categories | No |
| GET | `/categories/:id` | Get category by ID | No |
| POST | `/categories` | Create new category | Yes (Admin) |
| PUT | `/categories/:id` | Update category | Yes (Admin) |
| DELETE | `/categories/:id` | Delete category | Yes (Admin) |

### Tags
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/tags` | Get all tags | No |
| GET | `/tags/:id` | Get tag by ID | No |
| POST | `/tags` | Create new tag | Yes (Admin) |
| PUT | `/tags/:id` | Update tag | Yes (Admin) |
| DELETE | `/tags/:id` | Delete tag | Yes (Admin) |

### Comments
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/comments` | Get all comments | No |
| GET | `/comments/:id` | Get comment by ID | No |
| POST | `/comments` | Create new comment | Yes |
| PUT | `/comments/:id` | Update comment | Yes |
| DELETE | `/comments/:id` | Delete comment | Yes |

### Media
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/media` | Get all media files | Yes |
| POST | `/media` | Upload media file | Yes (Admin) |
| DELETE | `/media/:id` | Delete media file | Yes (Admin) |

### Settings
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/settings` | Get all settings | Yes (Admin) |
| PUT | `/settings` | Update settings | Yes (Admin) |

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | User login | No |
| POST | `/auth/register` | User registration | No |
| POST | `/auth/logout` | User logout | Yes |
| GET | `/auth/me` | Get current user | Yes |

### Internationalization
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/i18n/translations` | Get translations | No |
| PUT | `/i18n/translations` | Update translations | Yes (Admin) |

### Contact
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/contact` | Send contact message | No |
| GET | `/contact` | Get contact messages | Yes (Admin) |

## Error Responses
The API uses conventional HTTP response codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Response Format
All responses are in JSON format:
```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message"
}
```
