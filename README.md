# Family Calendar Application

A modern family calendar application built with Next.js, Supabase, and TypeScript. This application helps families manage their schedules with features like real-time updates, event categories, and shared calendars.

## Features

- 📅 Interactive calendar with month/week views
- 👨‍👩‍👧‍👦 Multi-family support
- 🎨 Event categories with color coding
- ⚡ Real-time updates
- 🌓 Dark/light mode support
- 📱 Responsive design
- 🔒 Secure authentication
- 🎯 Type-safe with TypeScript

## Prerequisites

Before you begin, ensure you have installed:
- Node.js 18.x or later
- npm 9.x or later
- A Supabase account

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/family-calendar.git
cd family-calendar
```

2. Install dependencies:
```bash
npm install
```

3. Create a Supabase project:
   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Copy the SQL from `src/lib/supabase/schema.sql`
   - Execute the SQL in the Supabase SQL editor

4. Set up environment variables:
   Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
family-calendar/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   │   ├── calendar/        # Calendar-related components
│   │   └── ui/             # Shared UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   │   └── supabase/       # Supabase client and types
│   └── types/              # TypeScript type definitions
├── public/                 # Static files
└── package.json           # Project dependencies and scripts
```

## Key Components

### Calendar Components
- `Calendar`: Main calendar grid component
- `CalendarHeader`: Navigation and view controls
- `EventModal`: Event creation/editing modal
- `CategoryManager`: Category management interface

### Authentication
- Supabase Authentication with email/password
- Google OAuth support
- Protected routes and API endpoints

### Database Schema
- Users table
- Families table
- Events table
- Categories table
- Family members table

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Implement proper error handling

### State Management
- Use React Query for server state
- Implement optimistic updates
- Handle loading and error states
- Use context for global state

### Component Structure
- Keep components small and focused
- Implement proper prop typing
- Use composition over inheritance
- Follow React best practices

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build production bundle
npm run start        # Start production server
npm run lint         # Run ESLint

# Type Checking
npm run type-check   # Run TypeScript compiler
```

## Environment Variables

Required environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Optional environment variables:
```env
NEXT_PUBLIC_SITE_URL=your_production_url
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

## Authentication Flow

1. User signs up/logs in
2. Supabase creates user record
3. Trigger creates profile
4. User is redirected to dashboard

## Database Policies

The application uses Row Level Security (RLS) policies to ensure:
- Users can only access their family's data
- Family members can view shared events
- Only authorized users can modify data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Deployment

### Vercel Deployment
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy the application

### Manual Deployment
1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## Security Considerations

- All database access is controlled through RLS policies
- API routes are protected with middleware
- Input validation using Zod
- Proper error handling
- Rate limiting on API routes

## Performance Optimization

- Implement proper caching strategies
- Use optimistic updates
- Lazy load components
- Optimize images and assets

## Troubleshooting

Common issues and solutions:

### Authentication Issues
- Verify environment variables
- Check Supabase configuration
- Ensure proper redirect URLs

### Database Issues
- Verify RLS policies
- Check database connections
- Validate schema migrations

## License

This project is licensed under the MIT License - see the LICENSE file for details.
