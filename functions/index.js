//const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/*
const functions = require('firebase-functions')
const admin=require('firebase-admin');
const nodemailer =require('nodemailer');
const cors = require('cors');
admin.initializeApp()
require('dotenv').config()

const {SENDER_EMAIL,SENDER_PASSWORD}= process.env;

exports.sendEmailNotification = functions.https
{
    const data= { email: 'pieroq.2899@gmail.com', texto: 'probando'};

    let authData=nodemailer.createTransport({
        host:'smtp-mail.outlook.com',
        port:587,
        secureConnection:false,
        auth:{
            user:SENDER_EMAIL,
            pass:SENDER_PASSWORD
        },
        tls: {
            ciphers:'SSLv3'
        }
    });
authData.sendMail({
from :'monitoreoemocional@outlook.com',
to:`${data.email}`,
subject:'Your Info',
text:`${data.texto}`,
html:`${data.email}`,
}).then(res=>console.log('successfully sent that mail')).catch(err=>console.log(err));

};*/

  
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const app = express();
app.use(cors({ origin: true }));

app.post("/", (req, res) => {
  const { body } = req;
  const isValidMessage = body.message && body.to && body.subject;

  if (!isValidMessage) {
    return res.status(400).send({ message: "invalid request" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'monitoreoemocional@gmail.com',
      pass: 'ntzaftbyfytydzgz'
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: body.to,
    subject: body.subject,
    text: body.message
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return res.status(500).send({ message: "error " + err.message });
    }

    return res.send({ message: "email sent" });
  });
});

module.exports.mailer = functions.https.onRequest(app);