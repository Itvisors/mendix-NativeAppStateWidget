## NativeAppStateWidget
Native AppState widget

## Features
Call an action when the app is backgrounded or resumed.

## Usage
Put the widget on a page and configure the actions.

Please note that iOS device will trigger the backgrounded event twice: once when the app is no longer on the foreground and once more when another app or device page is visible. Usually these are fired shortly after each other, but you could get only one  if the user receives a notification of some other app and swipes it away or refuses a phone call.

Be sure to only take action on the resume when it is at least x seconds since the last background event, to prevent firing stuff when the user only looked at some notification but did not open it. Very annoying if you implement PIN verification for example because the app should allow a little time for the user to look at a notification and return to the app. How long depends on security and functional requirements.
