# Venco

This is an expo managed Todo react native app .

# Instructions

Clone this repo to your local machine

`cd` into the project folder on the terminal

Run `yarn install`

## Running the application

1.  Start Metro: `yarn start`
2.  Start the application: Open a new terminal inside your React Native project folder. Run `expo start or yarn start`

## Call App Description

This is a call identification app that allows users to identify incoming calls, ignore calls, and search for contact information of caller. The app provide information of the incoming calls from unknown numbers and provides information about the caller's name and location.

it request permission to access the user's contacts using the Contacts.requestPermissionsAsync() method. Once the user grants permission, it retrieves the user's contacts and sets the state of the component

It also sets up a listener using the AppState.addEventListener() method to listen for changes in the app's state. When the app comes to the foreground, it displays an alert indicating that the app is in the foreground. When the app goes to the background or is quit, it displays an alert indicating that the app is in the background or has been quit and does not hinder the incoming call

The incomingCall interval is set up to randomly simulate incoming phone calls. If the user has no contacts, a message is displayed indicating that they have an incoming call from an unknown number. If the contact has no phone numbers associated with it, a message is displayed indicating that they have an incoming call from a contact without a phone number. Otherwise, a message is displayed indicating that they have an incoming call from the selected contact. The phone number of the contact is encrypted and stored in AsyncStorage for user privacy, as it ensures that contact information is kept secure and only accessible to the user

the app sets up a listener to listen for changes in the phone's state. This can be helpful for users who want to be notified when they receive a call, even if they are not actively using their phone.

Overall, the app provides an intuitive and user-friendly interface to manage calls and helps the user to stay organized and productive.
