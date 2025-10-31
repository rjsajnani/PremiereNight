# PremiereNight 🎬

A modern React Native movie discovery application built with Clean Architecture principles, featuring movie browsing, detailed information, and wishlist management powered by The Movie Database (TMDB) API.

### Note: Inital load of the app on iOS 18.0 or higher can return Axios error (404 mainly). This is due to some issue in iOS side. But incase it doesn't work you can reload the app again

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- 🎥 Browse now playing,to-rated,popular, movies
- ❤️ Wishlist functionality with local persistence
- 📊 Redux state management
- 🎨 Bottom tab navigation
- 🔍 Movie details view

## 🛠 Prerequisites

Before you begin, ensure you have the following installed:

### Required

- **Node.js**: v16.x or higher ([Download](https://nodejs.org/))
- **npm** or **Yarn**: Package manager
- **React Native CLI**: Latest version
- **Watchman** (macOS): For file watching ([Download](https://facebook.github.io/watchman/))

### For Android Development

- **Java Development Kit (JDK)**: v17 or higher
- **Android Studio**: Latest version with Android SDK
- **Android SDK Platform 33** (Android 13)
- **Android Emulator** or physical device with USB debugging enabled

### For iOS Development (macOS only)

- **Xcode**: v14.0 or higher
- **CocoaPods**: v1.11.0 or higher (`sudo gem install cocoapods`)
- **iOS Simulator** or physical device

### Verify Installation
```bash
# Check Node version
node --version  # Should be v16+

# Check npm version
npm --version

# Check React Native CLI
npx react-native --version

# Check Java version (for Android)
java -version  # Should be 17+

# Check CocoaPods (for iOS)
pod --version
```

## 📦 Installation

### Step 1: Clone the Repository
```bash
git clone git@github.com:rjsajnani/PremiereNight.git
cd PremiereNight
```

### Step 2: Install Dependencies
```bash
yarn install
```

### Step 3: Install iOS Dependencies (macOS only)
```bash
npx pod install
```

### Step 4: Set Up Environment Variables

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Add your TMDB API credentials:
```env
TMDB_API_KEY=your_api_key_here
API_URL=https://api.themoviedb.org/3/movie
```

> **Note**: Get your API key from [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)

## 🚀 Running the App

### Start Metro Bundler

First, start the Metro JavaScript bundler:
```bash
yarn start
```

Keep this terminal window open.

### Run on Android

Open a new terminal window and run:
```bash
npx react-native run-android
```

**Prerequisites for Android:**
- Start Android Emulator from Android Studio, OR
- Connect a physical device with USB debugging enabled

### Run on iOS (macOS only)

Open a new terminal window and run:
```bash
npx react-native run-ios
```


## 🏗 Architecture

### Clean Architecture Implementation

This project follows **Clean Architecture** principles with clear separation of concerns:
```
src/
├── domain/              # Business entities and rules (Framework-independent)
│   ├── models/         # Business entities (Movies, User, etc.)
├── application/         # Business logic and use cases
│   ├── movies/         
│   │   ├── useCases/   # Business operations
│
├── infrastructure/      # External concerns and implementations
│   ├── api/            # HTTP clients and repositories
│
└── presentation/        # UI and state management
    ├── screens/        # Screen components
    ├── components/     # Reusable UI components
    ├── navigation/     # Navigation configuration
    ├── state/          # Redux slices and store
    ├── hooks/          # Custom React hooks
```

### Key Architectural Decisions

#### 1. **Clean Architecture (Layered Approach)**

**Decision**: Implement Clean Architecture with four distinct layers.

**Rationale**:
- **Testability**: Each layer can be tested independently
- **Maintainability**: Clear separation makes code easier to understand and modify
- **Scalability**: Easy to add new features without affecting existing code
- **Framework Independence**: Business logic doesn't depend on React Native or Redux

**Trade-offs**:
- ✅ More boilerplate code initially
- ✅ Steeper learning curve for new developers
- ✅ Better long-term maintainability
- ❌ More files and folders to navigate

#### 2. **Redux Toolkit for State Management**

**Decision**: Use Redux Toolkit with Redux Persist for global state.

**Rationale**:
- Centralized state management for movies and wishlist
- Predictable state updates with actions/reducers
- Time-travel debugging with Redux DevTools
- Built-in immutability with Immer
- Persistent wishlist across app sessions


**Trade-offs**:
- ✅ Excellent developer experience
- ✅ Great debugging tools
- ✅ Large ecosystem
- ❌ Slightly more boilerplate than alternatives

#### 3. **React Navigation (Bottom Tabs + Stack)**

**Decision**: Use React Navigation 7 with bottom tabs and nested stacks.

**Rationale**:
- Industry standard for React Native navigation
- Type-safe navigation with TypeScript
- Native feel with platform-specific transitions

#### 4. **TypeScript Throughout**

**Decision**: Use strict TypeScript configuration.

**Rationale**:
- Catch errors at compile time
- Better IDE autocomplete and IntelliSense
- Self-documenting code
- Easier refactoring

#### 5. **Path Aliases for Imports**

**Decision**: Use `@` aliases for cleaner imports.
```typescript
// Instead of:
import { Movie } from '../../../domain/models/Movies';

// Use:
import { Movie } from '@domain/models';
```

**Rationale**:
- Cleaner, more readable imports
- Easier to move files around
- Less error-prone

### Key Assumptions

1. **API Assumptions**:
   - TMDB API is available and reliable
   - API response structure remains consistent
   - Images are hosted on TMDB CDN

2. **User Behavior**:
   - Users have internet connection for initial data fetch
   - Wishlist is personal
   - Users understand standard mobile UI patterns

3. **Data Management**:
   - Wishlist stored locally (no backend)
   - No user authentication required
   - Movie data refreshes on app launch


## 📁 Project Structure
```
PremiereNight/
├── src/
│   ├── domain/              # Business logic layer
│   ├── application/         # Use cases and services
│   ├── infrastructure/      # External integrations
│   └── presentation/        # UI components and state
│       ├── screens/
│       ├── components/
│       ├── navigation/
│       ├── state/
│       └── hooks/
├── android/                 # Android native code
├── ios/                     # iOS native code
├── .env                    # Environment variables
├── babel.config.js         # Babel configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🌍 Environment Variables

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `TMDB_API_KEY` | TMDB API Key | `abc123def456...` |
| `API_URL` | TMDB API Base URL | `https://api.themoviedb.org/3/movie` |

## 🐛 Troubleshooting

### Common Issues

**Metro Bundler Issues:**
```bash
# Clear Metro cache
npm start -- --reset-cache
```

**Android Build Failures:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**iOS Build Failures:**
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

**Module Not Found Errors:**
```bash
# Clear watchman
watchman watch-del-all

# Delete node_modules
rm -rf node_modules
npm install

# Clear Metro cache
npm start -- --reset-cache
```

### Platform-Specific Issues

**Android:**
- Ensure `ANDROID_HOME` environment variable is set
- Check that Android SDK Platform 33 is installed
- Verify USB debugging is enabled on device

**iOS:**
- Ensure Xcode Command Line Tools are installed: `xcode-select --install`
- Check that you're opening `.xcworkspace` not `.xcodeproj`
- Reset iOS Simulator: Device → Erase All Content and Settings

