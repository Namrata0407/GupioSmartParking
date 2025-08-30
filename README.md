# 🚗 Gupio Smart Parking

A modern React Native mobile application for smart parking management with real-time slot booking, user authentication, and intuitive UI/UX.

![React Native](https://img.shields.io/badge/React%20Native-0.81.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.8.2-purple)
![NativeWind](https://img.shields.io/badge/NativeWind-4.1.23-green)
![Zod](https://img.shields.io/badge/Zod-3.22.4-orange)

## 📱 Features

### 🔐 Authentication & Security
- **Employee Login System** with Employee ID and Password
- **Two-Factor Authentication (2FA)** with OTP verification
- **Password Reset Functionality** with email validation
- **Secure Session Management** using Redux state
- **Form Validation** using Zod schema validation

### 🏢 Dashboard & Analytics
- **Real-time Parking Statistics** showing total and available spots
- **Dynamic Greetings** based on time of day
- **Animated UI Components** for enhanced user experience
- **Quick Action Buttons** for booking and viewing reservations
- **User Profile Management** with logout functionality

### 🚗 Parking Management
- **Interactive Parking Layout** with visual slot representation
- **Real-time Slot Status** (Available/Booked)
- **Multi-section Parking** (US, LS, B3 sections)
- **One-click Slot Booking** with confirmation modals
- **Booking Cancellation** with confirmation dialogs
- **Visual Feedback** with animations and hover effects

### 📋 Booking Management
- **Active Bookings Dashboard** showing current reservations
- **Booking History** with timestamps and slot details
- **Booking Cancellation** from active bookings list
- **Real-time Updates** across all screens

### 🎨 User Interface
- **Modern Design** with Tailwind CSS styling
- **Responsive Layout** optimized for mobile devices
- **Smooth Animations** and transitions
- **Toast Notifications** for user feedback
- **Loading States** and error handling
- **Accessibility Features** with proper contrast and touch targets

## 🛠 Tech Stack

### Core Technologies
- **React Native 0.81.1** - Cross-platform mobile development
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Redux Toolkit 2.8.2** - State management
- **React Navigation 7.x** - Navigation and routing

### UI & Styling
- **NativeWind 4.1.23** - Tailwind CSS for React Native
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **React Native Reanimated 4.1.0** - Smooth animations
- **Lucide React Native 0.542.0** - Beautiful icons

### Development Tools
- **Zod 3.22.4** - Schema validation
- **React Native Toast Message 2.3.3** - Toast notifications
- **ESLint & Prettier** - Code formatting and linting
- **Jest** - Testing framework

## 📦 Installation

### Prerequisites
- Node.js >= 20
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/GupioSmartParking.git
   cd GupioSmartParking
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Run the application**

   **For iOS:**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

   **For Android:**
   ```bash
   npm run android
   # or
   yarn android
   ```

## 🚀 Usage

### Demo Credentials
For testing purposes, use these credentials:
- **Employee ID:** `EMP001`
- **Password:** `password123`
- **OTP:** Generated dynamically (shown in toast message)

### Key Features Walkthrough
 <img src="https://github.com/user-attachments/assets/aba31d46-63ad-4ffe-adb8-8f31dc68dbb4" alt="Login Screen" width="350"/>

1. **Login Process**
   - Enter Employee ID and Password
   - Click "Send OTP" to receive verification code
   - Enter the 6-digit OTP to complete login

<img src="https://github.com/user-attachments/assets/4c61163e-49f7-4cc3-82e1-f18bba6092e4" alt="Login Screen" width="350"/>

2. **Dashboard**
   - View parking statistics and available spots
   - Access quick actions for booking and viewing reservations
   - Logout functionality available

<img src="https://github.com/user-attachments/assets/bb936eb9-0288-4855-a0b8-9f2466c8665d" alt="Login Screen" width="350"/>

3. **Parking Layout**
   - Interactive grid showing all parking slots
   - Green slots = Available, Red slots = Booked
   - Tap available slots to book them
   - Confirmation modals for booking actions

<img src="https://github.com/user-attachments/assets/794187f7-b3bd-486f-990e-79cd0193d584" alt="Login Screen" width="350"/>

4. **Active Bookings**
   - View all current reservations
   - Cancel bookings with confirmation
   - Real-time updates across the app

<img src="https://github.com/user-attachments/assets/89e69e03-4466-47ae-b1bc-38a33b6f974b" alt="Login Screen" width="350"/>

5. **Forget Password Page**
   - Redirect user to the reset password page

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Main application screens
│   ├── LoginScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── ParkingLayoutScreen.tsx
│   ├── ActiveBookingsScreen.tsx
│   └── PasswordResetScreen.tsx
├── store/              # Redux store configuration
│   ├── store.ts
│   ├── parkingSlice.ts
│   └── hooks.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── helpers.ts
│   ├── validation.ts
│   ├── toastConfig.tsx
│   └── simpleToastConfig.ts
└── styles/             # Global styles
    ├── global.css
    └── output.css
```

## 🔧 Configuration

### Environment Setup
The app uses the following configuration files:
- `metro.config.js` - Metro bundler configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `babel.config.js` - Babel configuration
- `tsconfig.json` - TypeScript configuration

### State Management
The app uses Redux Toolkit for state management with the following slices:
- **Parking Slice**: Manages parking slots, bookings, and user state
- **User Authentication**: Handles login, logout, and session management

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Native community for the excellent framework
- Tailwind CSS team for the utility-first CSS framework
- Redux Toolkit team for simplified state management
- All contributors and maintainers

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common issues

---

**Made with ❤️ by the Gupio Smart Parking Team**
