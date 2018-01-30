/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// Node-based mailer utility
const nodemailer = require('nodemailer');


// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.

if (functions.config().gmail) {
  const gmailEmail = functions.config().gmail.email;
  const gmailPassword = functions.config().gmail.password;
  const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailEmail,
      pass: gmailPassword
    }
  });
}

const APP_NAME = 'Electric Forge';

admin.initializeApp(functions.config().firebase);

exports.purchaseMessenger = functions.database
  .ref('/orders/{orderId}').onWrite(event => {
    const { email, firstName, orderId } = event.data._delta;

    const mailOptions = {
      from: `${APP_NAME} <noreply@firebase.com>`,
      to: `${email}, electric.forge.dev@gmail.com`
    };

    let body = `Hey ${firstName}! Welcome to ${APP_NAME}.\n`;
    body += `Your order(#${orderId}) has been placed and a representative will contact you shortly.\n`;

    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = body;
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log(`email sent to: ${email}`);
    });
  });

exports.contactUsMessenger = functions.https.onRequest((req, res) => {
  const props = JSON.parse(req.body);
  const { bestTime, comments, email, name, phone} = props;

  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: 'electric.forge.dev@gmail.com'// commercial.sales@electricforge.us
  };

  let body = `Contact request from ${email}.\n`;
  body += `Name: ${name}\n`;
  body += `Best Time to Contact: ${bestTime}\n`;
  body += `Phone: ${phone}\n`;
  body += `Comments: ${comments}\n`;

  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = body;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log(`email sent to: ${email}`);
  });
});


// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database
exports.updateProductEthermineData = functions.https.onRequest((req, res) => {
  const productId = req.query.productId;
  const props = JSON.parse(req.body);

  admin.database().ref(`/products/${productId}`).update(props)
    .then(() => {
      res.json({ status: 'success' });
    });
});
