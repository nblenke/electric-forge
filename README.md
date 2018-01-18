
# Electric Forge

Staging
https://electric-forge-dev.firebaseapp.com/

Console
https://console.firebase.google.com/project/electric-forge-dev/overview

## Setup
```
npm i
npm i -g firebase-tools
firebase init
cd functions; npm install; cd -
firebase functions:config:set gmail.email="electric.forge.dev@gmail.com" gmail.password=""
```

## Dev
```
npm start
```

## Staging Deployment
```
npm run build
firebase deploy
```
