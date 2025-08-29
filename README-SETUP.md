# Task Dashboard - Setup Guide

## Authentication and Database Setup

This application now includes full authentication and database integration with Supabase. Follow these steps to complete the setup:

### 1. Supabase Configuration

1. Go to your Supabase project dashboard
2. Navigate to **Project Settings** > **API**
3. Copy your project URL and anon key
4. Add these as environment variables in your Supabase project settings:
   - `VITE_SUPABASE_URL`: Your project URL
   - `VITE_SUPABASE_ANON_KEY`: Your anon/public key

### 2. Database Schema Setup

1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql` into the editor
3. Run the SQL to create the tasks table and set up Row Level Security (RLS)

### 3. Authentication Setup

Authentication is now fully configured and includes:
- **Email/Password Authentication**: Users can sign up and sign in
- **Automatic User Management**: User sessions are handled automatically
- **Protected Routes**: Users must be authenticated to access the dashboard
- **User-specific Data**: Each user only sees their own tasks

### 4. Features Included

#### Authentication
- Sign up with email and password
- Sign in with existing credentials
- Automatic session management
- Secure logout functionality
- User profile display in navigation

#### Task Management API
- Create tasks with title, description, and priority
- Update task status (todo → in-progress → completed)
- Edit task details (title, description, priority)
- Delete tasks
- Real-time updates across browser tabs
- User isolation (users only see their own tasks)

#### Database Features
- PostgreSQL database with Supabase
- Row Level Security (RLS) for data protection
- Automatic timestamps (created_at, updated_at)
- Data validation and constraints
- Optimized indexes for performance

### 5. Security Features

- **Row Level Security**: Users can only access their own data
- **Authentication Required**: All API calls require valid user session
- **Input Validation**: Client and server-side validation
- **SQL Injection Protection**: Parameterized queries via Supabase client
- **HTTPS**: All connections are encrypted

### 6. Development

The app will automatically:
1. Show the authentication form if the user is not logged in
2. Redirect to the dashboard after successful authentication
3. Load the user's tasks from the database
4. Sync changes in real-time across browser tabs

### 7. Environment Variables

Make sure these are set in your Supabase project:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 8. Next Steps

Your task management application now has:
- Complete user authentication
- RESTful API for task management
- Real-time database synchronization
- Secure user data isolation
- Production-ready backend infrastructure

The application is ready for production use!
