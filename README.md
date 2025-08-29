# Task Dashboard - Full-Stack Task Management Application

A beautiful, responsive task management application built with React, TypeScript, Supabase, and modern web technologies. This project demonstrates full-stack development skills with authentication, real-time database integration, and serves as a comprehensive portfolio showcase.

![Task Dashboard Screenshot](https://via.placeholder.com/800x400?text=Task+Dashboard+Screenshot)

## Live Demo

[View Live Application](https://your-demo-link.com)

## Test Login Credentials

For quick testing without creating an account:
- **Email**: test@email.com
- **Password**: password

## Features

### Authentication & User Management
- **Email/Password Authentication**: Secure user registration and login
- **User Profiles**: Individual user accounts with email management
- **Session Management**: Automatic login persistence and secure logout
- **Password Security**: Minimum 6-character requirement with validation

### Core Functionality
- **Task Management**: Create, edit, delete, and organize tasks
- **Status Tracking**: Todo, In Progress, and Completed states
- **Priority System**: Low, medium, and high priority assignments
- **Search & Filter**: Find tasks quickly with real-time search
- **Dashboard Analytics**: Visual statistics and progress tracking
- **Real-time Sync**: Changes update instantly across browser tabs
- **Data Persistence**: All tasks saved to secure cloud database

### User Experience
- **Modern Design**: Clean, professional interface with custom design system
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Micro-interactions and transitions throughout
- **Dark/Light Mode**: Automatic theme switching support
- **Accessibility**: WCAG compliant with keyboard navigation
- **Protected Routes**: Secure access to dashboard with authentication

### Technical Features
- **Component Architecture**: Modular, reusable React components
- **TypeScript**: Full type safety and enhanced developer experience
- **Design System**: Consistent theming with CSS custom properties
- **Responsive Grid**: CSS Grid and Flexbox layouts
- **Modern Tooling**: Vite, ESLint, and modern development setup
- **Row Level Security**: Database-level user data protection

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom variants
- **Icons**: Lucide React for consistent iconography
- **State Management**: React hooks with custom authentication context
- **Routing**: React Router for navigation
- **Forms**: React Hook Form with Zod validation

### Backend & Database
- **Backend as a Service**: Supabase (PostgreSQL database)
- **Authentication**: Supabase Auth with email/password
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Real-time**: Supabase real-time subscriptions
- **API**: Auto-generated REST API via Supabase

### Development & Deployment
- **Type Safety**: Full TypeScript implementation
- **Code Quality**: ESLint for code consistency
- **Development**: Hot module replacement with Vite
- **Deployment**: Optimized production builds

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (buttons, cards, etc.)
│   ├── auth/            # Authentication components
│   │   └── AuthForm.tsx # Login/signup forms
│   ├── Hero.tsx         # Landing page hero section
│   ├── Navigation.tsx   # Main navigation component
│   ├── TaskBoard.tsx    # Main dashboard component
│   └── TaskItem.tsx     # Individual task component
├── pages/               # Page-level components
│   ├── Index.tsx        # Main application entry
│   └── NotFound.tsx     # 404 error page
├── hooks/               # Custom React hooks
│   ├── useAuth.tsx      # Authentication context and hooks
│   └── useTasks.ts      # Task management hooks
├── lib/                 # Utility functions and configuration
│   ├── supabase.ts      # Supabase client configuration
│   └── utils.ts         # Helper functions
├── assets/              # Static assets and images
└── index.css           # Global styles and design system
```

## Design System

The application features a comprehensive design system with:

- **Custom Color Palette**: Purple/blue gradient theme with semantic color tokens
- **Typography Scale**: Consistent font sizing and spacing
- **Component Variants**: Multiple button and card styles
- **Animation Library**: Smooth transitions and micro-interactions
- **Responsive Breakpoints**: Mobile-first approach with fluid layouts

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account (free tier available)
- Modern web browser with ES6+ support

### Supabase Setup

1. **Create a Supabase Project**
   - Go to [Supabase](https://supabase.com) and create a new project
   - Wait for the database to be set up

2. **Database Schema Setup**
   - Go to your Supabase dashboard → SQL Editor
   - Run the following SQL to create the tasks table:

   ```sql
   -- Create tasks table
   CREATE TABLE tasks (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'completed')),
     priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
   );

   -- Enable Row Level Security
   ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

   -- Create RLS policies
   CREATE POLICY "Users can view their own tasks" ON tasks
     FOR SELECT USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert their own tasks" ON tasks
     FOR INSERT WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can update their own tasks" ON tasks
     FOR UPDATE USING (auth.uid() = user_id);

   CREATE POLICY "Users can delete their own tasks" ON tasks
     FOR DELETE USING (auth.uid() = user_id);
   ```

3. **Get Your Supabase Credentials**
   - Go to Project Settings → API
   - Copy your Project URL and anon public key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-dashboard.git
   cd task-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - The Supabase credentials are already configured in the code
   - Update `src/lib/supabase.ts` with your project credentials if needed

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## Key Implementation Highlights

### Authentication System
- Email/password authentication with Supabase Auth
- Protected routes and session management
- Automatic token refresh and secure logout
- Form validation with React Hook Form and Zod

### Database Architecture
- PostgreSQL with Row Level Security (RLS)
- User-isolated data with secure policies
- Real-time subscriptions for live updates
- Optimized queries with proper indexing

### Custom Design System
- CSS custom properties for consistent theming
- Semantic color tokens for maintainable styling
- Component variants using class-variance-authority

### Component Architecture
- Composition over inheritance pattern
- Custom hooks for authentication and data management
- TypeScript interfaces for complete type safety
- Context providers for global state management

### Performance Optimizations
- Lazy loading for components
- Optimized bundle size with tree shaking
- Efficient re-rendering with React hooks
- Real-time updates without polling

### Security Features
- Row Level Security at database level
- JWT token-based authentication
- SQL injection protection via Supabase client
- Input validation on both client and server

### Responsive Design
- Mobile-first CSS approach
- Flexible grid systems
- Touch-friendly interactive elements

## Authentication Flow

1. **Landing Page**: Users see the hero section with "Get Started" button
2. **Authentication**: Email/password signup or signin forms
3. **Dashboard Access**: Authenticated users access the full task management interface
4. **Session Persistence**: Login state maintained across browser sessions
5. **Secure Logout**: Clean session termination with redirect to auth form

## Database Schema

### Tasks Table
```sql
tasks:
  - id: UUID (Primary Key)
  - title: TEXT (Required)
  - description: TEXT (Optional)
  - status: ENUM ('todo', 'in-progress', 'completed')
  - priority: ENUM ('low', 'medium', 'high')
  - user_id: UUID (Foreign Key to auth.users)
  - created_at: TIMESTAMP
  - updated_at: TIMESTAMP
```

### Row Level Security Policies
- Users can only access their own tasks
- Full CRUD operations available for task owners
- Automatic user_id enforcement on all operations

## Deployment

### Supabase (Recommended)
1. Database and authentication are automatically handled
2. Deploy frontend to any static hosting service
3. Update Supabase project settings for production domain

### Environment Variables
```bash
# These are configured in src/lib/supabase.ts
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Acknowledgments

- Backend infrastructure provided by [Supabase](https://supabase.com/)
- Design inspiration from modern productivity applications
- Icon set provided by [Lucide](https://lucide.dev/)
- Built with modern web technologies and best practices

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Star this repository if you found it helpful!**