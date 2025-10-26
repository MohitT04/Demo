# AiRA Chat

AiRA Chat is a simple React Native CLI app that mimics an AI-style chat experience. It includes basic authentication, a conversational chat interface, and a mock memory panel — all fully offline, no backend required.

Perfect for quick demos, hackathons, or as a starting point for building your own AI chat app.

---

## 🚀 Setup

### Requirements

Make sure you have:

- Node.js (v16 or later)
- React Native CLI
- Android Studio or Xcode (for running the app)

### Installation

```bash
npx react-native init AiRAChat
cd AiRAChat
npm install @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-safe-area-context react-native-screens
cd ios && pod install && cd ..   # for iOS
```

### Run the App

```bash
npx react-native run-android
# or
npx react-native run-ios
```

### Demo Login

```
Email: test@aira.ai
Password: password
```

---

## 🖼️ Screenshots & Demo Video

All media files are stored in the `/assets` folder for reference.

---

## 💬 Features

- **Login Screen:** Simple email/password with show & hide toggle.
- **Chat Interface:** AI-style word-by-word message animation with typing indicator.
- **AI Responses:** Keyword-based mock replies (e.g., “hi”, “startup”, “help”).
- **Memory Panel:** Displays what the AI “remembers” from your conversation.

---

## 🧠 Architecture

- **React Native CLI** – complete native control
- **React Navigation (Stack)** – simple screen management
- **React Context** – lightweight global state (user + memory)
- **StyleSheet API** – clean, native styling

---

## 🪄 Design Notes

This project is written in a **human-first, minimalist style** — no boilerplate or auto-generated code.  
It’s easy to read, modify, and extend. Everything runs locally for a fast and predictable demo experience.

---

## 🧩 Future Enhancements

- Save memories with AsyncStorage
- Connect to a real AI API
- Add avatars, timestamps, and dark mode
- Improve animations and message transitions

---

**AiRA Chat — a clean, human-crafted example of an offline AI chat app built with React Native.**
