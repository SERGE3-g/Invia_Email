"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require("nodemailer");
var imap = require("imap");
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'gueaserge2@gmail.com',
        pass: '3892978507Sg%',
    },
});
// creo la funzione per inviare l'email 
var mailOptions = {
    from: 'gueaserge2@gmail.com',
    to: 'guea.serge@pec.it',
    subject: 'Oggetto prova',
    text: 'Contenuto ciao sono una prova',
};
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log('Errore nell\'invio dell\'email:', error);
    }
    else {
        console.log('Email inviata con successo:', info.response);
    }
});
//Configuro il server di posta elettronica per la ricezione delle email e creo un'istanza dell'oggetto 
//imap per connettermi al server
var config = {
    user: 'gueaserge2@gmail.com',
    password: '3892978507Sg%',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
};
var client = new imap(config);
// creo la funzione per la ricezione delle email
client.connect(function () {
    client.openBox('INBOX', false, function () {
        client.search(['UNSEEN'], function (error, results) {
            if (error) {
                console.log('Errore nella ricerca delle email:', error);
            }
            else {
                results.forEach(function (result) {
                    var fetch = client.fetch(result, { bodies: '' });
                    fetch.on('message', function (msg) {
                        msg.on('body', function (stream) {
                            var buffer = '';
                            stream.on('data', function (chunk) {
                                buffer += chunk.toString('utf8');
                            });
                            stream.on('end', function () {
                                console.log('Contenuto dell\'email:', buffer);
                            });
                        });
                    });
                });
            }
        });
    });
});
