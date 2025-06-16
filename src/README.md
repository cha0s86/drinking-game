# Drink Game

A modern, responsive drinking game app built with React and TypeScript.

## Features

- Add and manage players with gender selection
- Randomized drinking tasks each round
- Special rules: jail, bitch, and more
- Winner detection and restart option
- Responsive dark theme for desktop and mobile
- Cross-platform ready (web, Android/iOS via Capacitor)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/drinkgame.git
cd drinkgame
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app in development mode

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `build` directory.

---

## Build for Android/iOS (using Capacitor)

1. **Install Capacitor (if not already):**
   ```bash
   npm install @capacitor/core @capacitor/cli
   ```

2. **Initialize Capacitor:**
   ```bash
   npx cap init
   ```

3. **Build your React app:**
   ```bash
   npm run build
   ```

4. **Copy the build to Capacitor:**
   ```bash
   npx cap copy
   ```

5. **Add Android/iOS platform:**
   ```bash
   npx cap add android
   # or
   npx cap add ios
   ```

6. **Open in Android Studio/Xcode:**
   ```bash
   npx cap open android
   # or
   npx cap open ios
   ```

---

## License

MIT

---

**Enjoy the game! Drink responsibly.**