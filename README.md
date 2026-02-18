
# JobTrackr API 🚀

Backend REST API for JobTrackr – a job tracking and management platform with robust authentication, role-based access, and admin functionalities.


---

# Current Status 📝 

Implemented Features (Stable) ✅ 

## Authentication

- User registration (/api/auth/register)

- User login (/api/auth/login) with JWT

- Protect middleware for secured routes

- Block access for deleted users


## User Management

- MongoDB User model:

    . email, password (hashed)

    . role (user / admin)

    . isDeleted, deletedAt (soft delete ready)

- Deleted users cannot login or appear in admin list


## Authorization

- authorizeRoles middleware

- Admin routes protected


## Admin Features

- View all users

- Change user roles

- Delete users (soft delete ready)

- Admin cannot delete themselves


## Infrastructure

- Unified API responses

- Centralized error handling via middleware

- Ready for frontend integration



## Planned Features

- Audit logs

- Advanced pagination and filters

- Automated tests

- Swagger documentation

- Seed admin user (optional script)


---

## Project Structure 📁 

jobtrackr-api/
 
    src/
        app/                 # app setup
            app.ts   

        config/              # Environment and config files
            env.ts      

        controllers/         # Request handlers
            auth.controller.ts
            user.controller.ts
            admin.controller.ts
            health.controller.ts

        database/             # DB connection
            connectDB.ts

        errors/               # Custom error handling
            appError.ts
            errorHandler.ts
        
        middleware/            # Middlewares
            auth.middleware.ts
            authorize.middleware.ts
            error.middleware.ts
            admin.middleware.ts
            validate.middleware.ts
    
        models/                # Mongoose schemas
            User.ts
    
        routes/                # API routes
            auth.routes.ts
            user.routes.ts
            admin.routes.ts
            admin.routes.ts
        
        types/                  # TypeScript Custom types
            express.d.ts
      
        utils/                   # Utilities
            response.ts          # unified success/error responses
            asyncHandler.ts

        validation/              # Request validation
            admin.validation.ts
            auth.validation.ts

        server.ts                # Start
    
    .env                         # Environment
    package.json                 # Dependency and scripts
    package-lock.json            # Exact dependency     
    tsconfig.json                # TypeScript configuration
    README.md                    # Project documentation


---

## Tech Stack 🛠️ 

[Node.js]	Runtime	(18.x)
[Express]	Web framework	(4.x)
[MongoDB]	Database	(6.x)
[Mongoose]	ODM	(7.x)
[TypeScript]	Type safety & code clarity	(5.x)
[JWT]	Authentication tokens	(9.x)
[bcrypt]	Password hashing	(5.x)
[Zod]	Request validation	(3.x)
[ts-node-dev]	Dev server	(2.x)


---

## Getting Started 🚀 

1. Clone the repository

> git clone https://github.com/roudihannanIT/jobtrackr-api.git
> cd jobtrackr-api

2. Install dependencies

> npm install

3. Environment Variables

> cp .env.example .env

Edit .env with your configuration:

PORT=4000
MONGODB_URI=mongodb://localhost:27017/jobtrackr
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

4. Run the server

> npm run dev

API is available at http://localhost:4000


---

## API Overview 📚 

### Authentication

Method	    Endpoint	                Description	                Access

POST	    /api/auth/register	        Register new user	        Public
POST	    /api/auth/login	            Login user	                Public


### User

Method	    Endpoint	                Description	                Access

GET	        /api/users/me	            Get user profile	        Private



### Admin

Method	    Endpoint         	        Description	                Access

GET	        /api/admin/dashboard	    Admin welcome dashboard	    Admin
GET	        /api/admin/users	        Get all users	            Admin
PATCH	    /api/admin/users/:id/role	Change user role	        Admin
DELETE	    /api/admin/users/:id	    Delete user     	        Admin


---

## Authentication Flow 🔐 

Login Request

POST /api/auth/login
{
  "email": "user@example.com",
  "password": "Password123"
}

Response

{
  "success": true,
  "user": {
    "id": "abc123",
    "email": "user@example.com",
    "role": "user"
  },
  "token": "jwt_token_here"
}


---

## Notes 📝 

- Authentication: JWT tokens used, sent in Authorization: Bearer <token> header.
- Authorization: authorizeRoles(UserRole.ADMIN) middleware protects admin endpoints.
- Validation: All input validated via Zod + validate middleware.
- Responses: Unified { success, message?, data? } format.
- Error Handling: Centralized error.middleware.ts.

---

## Author 👨‍💻 

Eng. Roudi Hannan

GitHub: @roudihannanIT
Instagram: @roudihannan8

---

## Open source 📄

Feel free to use this code for learning or any purpose.


### If you found this project helpful, please give it a star on GitHub! ⭐️
