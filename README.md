# Passio React Native Code Challenge

## Installation

Make sure your version of [yarn](https://www.yarnpkg.com/) is up to date, e.g. assuming you've installed [node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm):

```
npm install -g yarn

```

Please clone react native project
Once the project is cloned, you must open a terminal or console window, cd into the react native project directory, and run `yarn install`.

If you're uing MacOS you can build-and run for an iOS target using Xcode, even if you don't have an iOS device. First run `cd ios; pod install; cd ..` (requires that you've installed [cocoapods](https://cocoapods.org/). Then open the Xcode workspace (NOT the Xcode _project_) `ios/PassioRN_CC.xcworkspace.xcworkspace`. Select an iOS Simulator Target and Command-R will build and run.

On MacOS or Windows you can build and run on Android, even if you don't have an Android device. Install [Android Studio](https://developer.android.com/studio/install). 
Please check `local.properties` file and android sdk path of your computer in this file.
example: `sdk.dir=/Users/denys/Library/Android/sdk`
Add an existing project and navigate to the `android` directory. Android Studio often prints scary warnings when opening react-native apps. Clicking the trash can icon to clear the Gradle console will erase these. Use the Android Virtual Device mangement tools to create a virtual android device, selecting the newest version of Android operating system to put on it. The first time you run Android studio it may need to update and install components. It's not uncommon to need to quit and re-run Android studio after an update to get it to work properly. Clicking the Bug button in the toolbar will build-and run.

## Run iOS application
```
yarn ios
```

## Run Android application
```
yarn android
```

## Unit Test
```
yarn test
```

## Common Issues

- After running from Xcode, if the app doesn't work

  1.) Try closing the Terminal window running the Metro bundler, and then re-run from Xcode.

  2.) Try doing a clean build in Xcode and then build-and run

  3.) Try running `yarn` again to install any new dependencies

