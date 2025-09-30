# Paybills.ng - Fintech Platform

## Overview

Paybills.ng is a responsive, PWA-enabled fintech platform designed for the Nigerian market. The application provides users with comprehensive bill payment services, wallet management, and financial transaction capabilities. This is a full-stack web application built with a modern React frontend and Express.js backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared components:

- **Frontend**: React.js with TypeScript, using Vite as the build tool
- **Backend**: Express.js with TypeScript for API services
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Context API with custom hooks
- **Form Handling**: React Hook Form with Yup validation
- **Build System**: Vite for frontend, esbuild for backend bundling

## Key Components

### Frontend Architecture
- **Component Structure**: Modular component organization with feature-based folders
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with CSS variables for theming and dark mode support
- **Form Management**: React Hook Form with comprehensive validation schemas
- **State Management**: Context providers for authentication, theme, and notifications
- **Data Fetching**: TanStack Query for server state management

### Backend Architecture
- **API Design**: RESTful API with Express.js
- **Database Layer**: Drizzle ORM with PostgreSQL dialect
- **Storage Interface**: Abstract storage interface with in-memory implementation for development
- **Authentication**: Session-based authentication with 2FA support
- **Validation**: Server-side validation with Zod schemas

### Database Schema
The application uses a comprehensive schema supporting:
- **Users**: Complete user profiles with KYC status, referral system, and role-based access
- **Wallets**: Balance tracking with earnings and spending history
- **Transactions**: Detailed transaction logging with metadata support
- **Services**: Service catalog management
- **Referrals**: Multi-level referral system
- **Agent Commissions**: Commission tracking for agent users
- **Notifications**: In-app notification system

## Data Flow

1. **Authentication Flow**: Login → OTP Verification → 2FA (if enabled) → Dashboard
2. **Service Purchase Flow**: Service Selection → Form Validation → Wallet Balance Check → Transaction Processing → Confirmation
3. **Wallet Management**: Fund Wallet → Transaction History → Balance Updates
4. **Real-time Updates**: Context-based state management with optimistic updates

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

### Database and Backend
- **Neon Database**: PostgreSQL serverless database provider
- **Drizzle ORM**: Type-safe database operations
- **Express.js**: Web application framework

### Development Tools
- **TypeScript**: Type safety across the entire application
- **Vite**: Fast build tool with hot module replacement
- **ESBuild**: Fast bundling for production builds

## Deployment Strategy

### Development Environment
- **Frontend**: Vite development server with hot reloading
- **Backend**: tsx for TypeScript execution in development
- **Database**: Connection to Neon PostgreSQL instance via DATABASE_URL

### Production Build
- **Frontend**: Static build output to `dist/public` directory
- **Backend**: ESBuild bundle to `dist/index.js` for Node.js execution
- **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **NODE_ENV**: Environment detection for development/production modes
- **DATABASE_URL**: PostgreSQL connection string (required)
- **Build Scripts**: Separate build processes for frontend and backend with concurrent execution

### Security Considerations
- **Input Validation**: Comprehensive validation on both client and server
- **Authentication**: Secure session management with 2FA support
- **Database**: Parameterized queries through Drizzle ORM
- **CORS**: Configured for secure cross-origin requests in production

The application is designed to be scalable, maintainable, and secure, with a focus on user experience and accessibility compliance (WCAG 2.1 AA standards).

## Recent Changes: Latest modifications with dates

### January 25, 2025 - Universal Paystack & Restricted Crypto Payments
- **UnifiedPaymentModal Component**: Created comprehensive payment modal supporting Paystack, crypto, and Pi Network payments
- **Platform-Wide Paystack Support**: Extended Paystack integration to all services including:
  - Airtime & Data purchases (MTN, Glo, Airtel, 9mobile) - Paystack only
  - Utility bill payments (electricity, cable TV, internet) - Paystack only
  - Betting wallet funding (Bet9ja, SportyBet, BetKing, etc.) - Paystack only
  - Software purchases and activations - Full payment options (Paystack, Crypto, Pi Network)
- **Crypto Restriction**: Cryptocurrency and Pi Network payments only available for software store purchases
- **Hidden Live Exchange Rates**: Real-time USD/NGN conversion and crypto pricing work silently in background
- **Clean Payment UI**: Removed visible rate displays while maintaining automatic calculations and conversions
- **Background Rate Updates**: CoinGecko API and ExchangeRate-API refresh rates every 5 minutes without user notifications
- **Service-Specific Payment Options**: Payment methods dynamically shown based on service type
- **Enhanced User Experience**: Consistent payment flow across all platform services with proper validation and success handling
- **Network-Specific USDT Support**: Full support for 8 major blockchain networks with safety warnings (software only)
- **Service-Specific Metadata**: Each payment includes detailed service information for transaction tracking

### January 25, 2025 - Nigerian Youth Design & Mobile Optimization Update + "easy...reliable" Tagline
- **Brand Tagline**: Added "easy...reliable" tagline across platform navigation headers, Home page, and footer
- **Complete Tagline Integration**: Replaced all "Nigerian Fintech" references with "easy...reliable" across the entire platform
- **Comprehensive Global Search**: Implemented Ctrl+K shortcut search that crawls all pages and services with real-time filtering
- **Mobile-Responsive Notifications**: Completely optimized notification system for mobile devices with touch-friendly interfaces
- **Betting Section Redesign**: Complete mobile-friendly redesign with proper green header colors matching platform theme
- **Free Activation Limit**: Reduced free software activation to only 1 use, then payment required (₦1,500)
- **Blog and FAQ Sections**: Created comprehensive blog with fintech insights and detailed FAQ section with search functionality

### Previous Changes - January 25, 2025 - Nigerian Youth Design & Mobile Optimization Update
- **Energetic Color Scheme**: Updated to vibrant green theme (hsl(142, 76%, 36%)) for energetic Nigerian youth and tech vibes
- **Source Attribution Removal**: Completely removed ESDCodes.com and CDKeyPrices.com branding from product displays
- **Software Page Accessibility**: Made software page public (no login required) with dedicated public navigation
- **Home Page Activation Tool**: Added free software activation tool with 3 free uses, then ₦1,500 for guests
- **Dashboard Access Restriction**: Limited dashboard access to post-purchase users only
- **PWA Optimization**: Full Progressive Web App support with manifest.json for Android/iOS mobile installation
- **Mobile-First Design**: Enhanced responsive design with mobile-optimized navigation and touch-friendly interfaces
- **Database Product Storage**: All software products now stored in PostgreSQL with SEO-friendly descriptions

### January 24, 2025 - Advanced Features Implementation
- **Nigerian Payment API Integration**: Added Paystack and Flutterwave payment providers with complete initialization and verification capabilities
- **Real-time Notifications**: Implemented WebSocket-based notification system for transaction updates, wallet changes, and system announcements
- **Multi-language Support**: Added i18next internationalization with English, Hausa, Yoruba, and Igbo translations
- **Advanced Analytics Dashboard**: Created comprehensive analytics with multiple chart types using Recharts library
- **Enhanced Navigation**: Built responsive navigation system with language switching and theme toggle
- **Payment Modal Component**: Developed advanced payment modal with provider selection and real-time payment processing
- **Theme Provider**: Implemented dark/light theme switching with system preference detection
- **WebSocket Server Integration**: Added real-time communication capabilities for live transaction updates