# Paybills.ng - "easy...reliable"

A comprehensive fintech platform designed for the Nigerian market, providing seamless bill payment services, wallet management, and digital product purchases with energetic youth-focused design.

## Features

### Core Services
- **Airtime & Data**: Purchase for MTN, Glo, Airtel, 9mobile networks
- **Utilities**: Pay electricity, cable TV, and internet bills
- **Betting**: Fund betting wallets for popular platforms (Bet9ja, SportyBet, BetKing, etc.)
- **Software Store**: Purchase and activate genuine software products

### Payment Options
- **Paystack Integration**: Secure card and bank transfer payments (all services)
- **Cryptocurrency**: Bitcoin, Ethereum, USDT support (software store only)
- **Pi Network**: Pi cryptocurrency payments (software store only)
- **Multi-Network USDT**: Support for 8 major blockchain networks

### Platform Features
- **Progressive Web App (PWA)**: Install on Android/iOS devices
- **Multi-language Support**: English, Hausa, Yoruba, Igbo
- **Dark/Light Theme**: System preference detection
- **Real-time Notifications**: WebSocket-based updates
- **Global Search**: Ctrl+K shortcut for platform-wide search
- **KYC System**: User verification and compliance
- **Referral Program**: Multi-level commission system
- **Mobile-First Design**: Optimized for Nigerian mobile users

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** with shadcn/ui components
- **Wouter** for lightweight routing
- **TanStack Query** for server state management
- **React Hook Form** with Yup validation

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** with Neon serverless database
- **Drizzle ORM** for type-safe database operations
- **WebSocket** for real-time communication
- **Session-based authentication**

### UI/UX
- **Radix UI** primitives for accessibility
- **Lucide React** for icons
- **Framer Motion** for animations
- **Responsive design** with mobile optimization

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (recommend Neon for serverless)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/paybills-ng.git
   cd paybills-ng
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL=postgresql://username:password@host:port/database
   NODE_ENV=development
   SESSION_SECRET=your-session-secret-key
   
   # Optional: For production deployment
   REPLIT_DOMAINS=your-domain.com
   REPL_ID=your-repl-id
   ```

4. **Database Setup**
   ```bash
   # Push database schema
   npm run db:push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

### Available Scripts

- `npm run dev` - Start development server (frontend + backend)
- `npm run build` - Build for production
- `npm run db:push` - Push database schema changes
- `npm run preview` - Preview production build locally

## Project Structure

```
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages/routes
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   ├── types/         # TypeScript type definitions
│   │   └── context/       # React context providers
├── server/                # Backend Express application
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database operations
│   ├── db.ts              # Database connection
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema definitions
└── package.json           # Dependencies and scripts
```

## Key Features Implementation

### Payment System
- **UnifiedPaymentModal**: Handles all payment methods with service-specific options
- **Service Detection**: Automatically shows appropriate payment methods
- **Background Rate Updates**: Live exchange rates refresh every 5 minutes

### Authentication & Security
- **Session Management**: Secure server-side sessions
- **2FA Support**: Two-factor authentication option
- **KYC Integration**: User verification system
- **Input Validation**: Client and server-side validation

### Mobile Experience
- **PWA Support**: Installable on mobile devices
- **Touch-Friendly UI**: Optimized for mobile interactions
- **Responsive Design**: Works on all screen sizes
- **Offline Capability**: Basic offline functionality

## Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
```env
NODE_ENV=production
DATABASE_URL=your-production-database-url
SESSION_SECRET=secure-production-secret
REPLIT_DOMAINS=yourdomain.com
```

### Database Migration
```bash
npm run db:push
```

## API Endpoints

### Authentication
- `GET /api/auth/user` - Get current user
- `POST /api/login` - User login
- `POST /api/logout` - User logout

### Services
- `POST /api/airtime` - Purchase airtime
- `POST /api/utilities` - Pay utility bills
- `POST /api/betting` - Fund betting accounts
- `GET /api/software` - Get software products

### Payments
- `POST /api/payment/paystack` - Initialize Paystack payment
- `POST /api/payment/crypto` - Process cryptocurrency payment
- `POST /api/payment/verify` - Verify payment status

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Email: support@paybills.ng
- Documentation: [docs.paybills.ng](https://docs.paybills.ng)
- Issues: [GitHub Issues](https://github.com/yourusername/paybills-ng/issues)

## Acknowledgments

- Nigerian fintech ecosystem for inspiration
- Paystack for payment processing
- Neon for serverless PostgreSQL
- The React and Node.js communities

---

**Paybills.ng** - Making Nigerian digital payments "easy...reliable"