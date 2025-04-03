# User Management System

A robust Node.js/Express backend application for user management with JWT authentication.

## Features

- User registration and authentication
- JWT-based secure login system
- User profile management
- Role-based access control
- Secure password handling with bcrypt
- User session management
- RESTful API endpoints

## Prerequisites

- Node.js (v12 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=your_mongodb_connection_string
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/users` - Get all users (admin only)
- `DELETE /api/users/:id` - Delete a user (admin only)
- `PUT /api/users/update` - Update user profile
- `GET /api/dashboard` - Get user dashboard data

## User Model Schema

The user model includes the following fields:
- name
- email
- password (hashed)
- phoneNumber
- role
- logstatus
- avatar
- country
- majority
- IFSC_Code
- bank
- branch
- balance

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Protected routes using middleware
- Input validation
- Secure session management

## Error Handling

The application includes comprehensive error handling for:
- Invalid credentials
- Missing required fields
- Duplicate email addresses
- Invalid JWT tokens
- Database operations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

nathanscott5467@gmail.com
