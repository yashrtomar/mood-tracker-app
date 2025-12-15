# Moody App

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

    ```bash
    npm install
    ```

2. Start the app

    ```bash
    npx expo start
    ```

In the output, you'll find options to open the app in a

-   [development build](https://docs.expo.dev/develop/development-builds/introduction/)
-   [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
-   [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
-   [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Libraries used

-   [react-native-async-storage] (https://github.com/react-native-async-storage/async-storage)
-   [react-native-community/slider] (https://github.com/callstack/react-native-slider)
-   [react-native-picker/picker] (https://github.com/react-native-picker/picker)
-   [expo-crypto] (https://github.com/expo/expo/tree/sdk-54/packages/expo-crypto)
-   [expo-notifications] (https://github.com/expo/expo/tree/sdk-54/packages/expo-notifications)
-   [react-native-chart-kit] (https://github.com/indiespirit/react-native-chart-kit)

## Bonus features

-   Color coded mood: Implemented color codes for moods from 0- red to 100- green and the spectrum in between to, so color variations from red to green like yellow, orange and other shades can be seen with different mood scores.
-   Ability to delete mood entries: Mood history list has a delete button which deletes the entry from async storage and updates the list immediately.
-   Month selector to view trends for a specific month: A month picker has been implemented in "Mood over time" chart in the charts screen.
-   Local notification reminder: Local notification reminder to log mood has been implemented using expo-notifications library, it is set to 9 pm and can be changed from 'utils/notifications.ts'.
