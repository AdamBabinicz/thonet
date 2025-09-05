# Thonet Digital Heritage Project

## Overview

A premium, fully accessible web application dedicated to the history and heritage of Michael Thonet and his revolutionary bent-wood furniture. This interactive educational platform combines elegant design with cutting-edge accessibility features to showcase the legacy of furniture craftsmanship and innovation. Built as a multilingual (Polish, English, German) experience with comprehensive WCAG 2.1 AA compliance and interactive learning modules.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18+ with TypeScript and Vite for development and build tooling
- **Styling System**: Tailwind CSS with custom CSS variables for premium brown-gold theming (light/dark modes)
- **Component Library**: Radix UI primitives with shadcn/ui components for consistent, accessible UI elements
- **Animation Framework**: Framer Motion for smooth interactions and educational module animations
- **State Management**: React Context for theme management and language preferences
- **Data Fetching**: TanStack React Query for server state management

### Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **Database Integration**: Drizzle ORM configured for PostgreSQL with Neon Database serverless
- **Session Management**: PostgreSQL-based sessions using connect-pg-simple
- **API Design**: RESTful endpoints with `/api` prefix routing
- **Development Server**: Vite integration for hot module replacement in development

### Internationalization (i18n)
- **Library**: react-i18next with browser language detection
- **Supported Languages**: Polish (default), English, German
- **Routing Strategy**: Locale-based URLs (`/[locale]/...`) with optional Polish prefix
- **Translation Structure**: JSON files organized by locale in `/src/locales/{locale}/translation.json`
- **Dynamic Language Switching**: Runtime language changes with automatic HTML lang attribute updates

### Accessibility Implementation
- **Standards Compliance**: WCAG 2.1 AA level with 4.5:1 minimum color contrast ratios
- **Keyboard Navigation**: Full keyboard accessibility with visible focus management and skip links
- **Screen Reader Support**: Comprehensive ARIA labels, semantic HTML structure, and live region announcements
- **Interactive Features**: Focus trapping in Control Hub, expandable/collapsible states with proper ARIA attributes
- **Testing Integration**: vitest-axe for automated accessibility testing during development

### UI/UX Innovations
- **Control Hub**: Collapsible vertical navigation panel with smooth animations, language switching, theme controls, and accessibility options
- **Interactive Learning Modules**: 
  - Product deconstruction component with animated furniture part separation
  - Process simulation with step-by-step wood bending technique visualization
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Theme System**: Light/dark mode toggle with high-contrast accessibility option

### SEO and Metadata
- **Meta Management**: react-helmet-async for dynamic HTML head updates
- **Structured Data**: Schema.org JSON-LD implementation for WebSite, Person, and Product schemas
- **Canonical URLs**: Proper URL structure for multilingual SEO
- **Performance**: Optimized asset loading and code splitting

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production data storage
- **Drizzle Kit**: Database migrations and schema management

### Development Tools
- **Vite**: Frontend build tool and development server
- **ESBuild**: Server-side bundling for production builds
- **TypeScript**: Static type checking across frontend and backend

### UI and Animation Libraries
- **Radix UI**: Unstyled, accessible React primitives for complex components
- **Framer Motion**: Animation library for interactive educational modules
- **Lucide React**: Icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework with custom design system

### Internationalization Stack
- **i18next**: Core internationalization framework
- **react-i18next**: React integration for i18next
- **i18next-browser-languagedetector**: Automatic language detection

### Testing Framework
- **Vitest**: Unit and integration testing with React Testing Library
- **vitest-axe**: Automated accessibility testing integration
- **Playwright**: End-to-end testing (configured but not implemented in current codebase)

### Hosting and Deployment
- **Replit**: Development environment with integrated deployment capabilities
- **Node.js**: Runtime environment for Express server
- **Static Asset Serving**: Vite-generated assets served through Express in production