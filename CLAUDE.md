# CLAUDE.md - Indian Traffic Rules Portal

## Project Overview

The Indian Traffic Rules Portal is a comprehensive digital platform providing citizens, law enforcement, and administrators with access to traffic rules, regulations, penalties, and related services across all Indian states. It serves as a one-stop solution for traffic-related information, document management, fuel price tracking, emergency services, and educational tools.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS (responsive, mobile-first)
- **State Management**: React Context API
- **UI Components**: Headless UI (accessibility)
- **Icons**: Lucide React
- **PWA**: Service Worker for offline support
- **Testing**: Jest + React Testing Library
- **Build Target**: < 500KB gzipped bundle

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/             # Route-level page components
├── contexts/          # React Context providers (global state)
├── hooks/             # Custom React hooks
├── utils/             # Utility functions and helpers
├── data/              # Static data (traffic rules, state info, signs)
├── types/             # TypeScript type definitions and interfaces
├── services/          # API integration and external service calls
└── assets/            # Static assets (images, icons)
```

## Core Modules

### Traffic Rules System
- State-wise traffic rules database covering all 36 states/UTs
- Categorized rules: Documentation, Safety, Traffic, DUI
- Speed limits visualization (highway, city, residential)
- Special traffic zones with state-specific regulations

### Document Management
- Digital document wallet (License, Registration, Insurance, PUC)
- Expiry tracking with 30-day advance renewal reminders
- Add/edit/delete with validation and status indicators

### Fuel Management
- Real-time city-wise fuel prices (Petrol, Diesel, CNG)
- Trip cost calculator (distance, mileage, fuel type, round trip)
- Price trend analysis and multi-state comparison

### Emergency Services
- State-specific emergency contacts with one-touch dialing
- GPS-based location detection and sharing
- Offline emergency number access

### Educational System
- Interactive quiz with state-specific questions and difficulty levels
- Achievement/badge system with points and streak tracking
- Comprehensive traffic signs guide with categorized display

### Vehicle Registration Checker
- Registration number validation and vehicle details lookup
- Insurance and PUC status checking

### Fine Calculator
- Multi-violation selection with real-time calculation
- Violation search functionality

## Development Guidelines

### Code Conventions
- TypeScript strict mode — use interfaces for all data structures
- Functional components with hooks (no class components)
- Context providers for shared state; avoid prop drilling
- Mobile-first responsive design using Tailwind breakpoints
- WCAG 2.1 AA accessibility compliance required
- All components must support keyboard navigation and screen readers

### Performance Targets
- Initial page load: < 2 seconds
- Time to interactive: < 3 seconds
- 60 FPS animations on mobile
- Lighthouse mobile score: 90+
- Accessibility score: 95+
- Core features must work offline via Service Worker

### Testing Requirements
- Target 90%+ code coverage
- Unit tests for component logic, utilities, and data transformations
- Integration tests for inter-component communication and data flows
- Cross-browser and cross-device testing

### Security
- No sensitive data in client bundles
- HTTPS-only API communication
- Local data encryption for stored documents
- Comply with Indian data protection laws and GDPR
- User consent required before data collection

### Data Architecture
- Structured data for all 36 states/UTs with fast search
- Local storage for user preferences and cached data
- Cache-first Service Worker strategy
- Runtime data validation alongside TypeScript compile-time checks

## Navigation Structure

```
Home Dashboard
├── State Selection
├── Traffic Rules (Rules Table, Speed Limits, Special Zones, Emergency Contacts)
├── Account Menu (Document Manager, Fuel Prices, Vehicle Checker, Achievements)
├── Tools (Fine Calculator, Quiz System, Traffic Signs, License Tools)
└── Settings (Preferences, Notifications, Privacy)
```

## Current Phase

**Phase 2 — Enhanced Features**: Document management, enhanced fuel management, fine calculator improvements, quiz system enhancements, achievement system. Phase 1 (core rules, state selection, speed limits, emergency contacts, PWA) is complete.
