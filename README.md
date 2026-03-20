# hälsoPilot — React Native App

## Setup (one time)

Open Command Prompt on Windows and run these commands one at a time:

```
npm install -g expo-cli
```

Then navigate to this folder:
```
cd path\to\halsopilot-rn
```

Install dependencies:
```
npm install
```

## Run the app

```
npx expo start
```

A QR code will appear. Open **Expo Go** on your Samsung Ultra and scan it.
The app will load on your phone. Any changes you make reload instantly.

## Troubleshooting

- Make sure your Windows PC and Samsung are on the **same WiFi network**
- If the QR code doesn't work, press `a` in the terminal to open on Android
- If you see errors about packages, run `npm install` again

## Project structure

```
App.tsx                    ← Root, wires everything together
src/
  constants/tokens.ts      ← Swedish palette + spacing + typography
  context/
    ThemeContext.tsx        ← Dark/light mode
    ToastContext.tsx        ← Toast notifications
  components/shared/
    AppHeader.tsx           ← hälsoPilot wordmark header
    BottomNav.tsx           ← 5-tab persistent nav
    BottomSheet.tsx         ← Reusable sheet component
    Toast.tsx               ← Toast display
    SectionRow.tsx          ← Section label + action button
    NavIcons.tsx            ← SVG icons for nav
  screens/
    TodayScreen.tsx         ← Today (full)
    PlaceholderScreens.tsx  ← Health, Meds, Vitals, Wallet (stubs)
```
