import * as nodemailer from 'nodemailer';
import * as imap from 'imap';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'gueaserge2@gmail.com',
        pass: '**************',
    },
});

// creo la funzione per inviare l'email 
const mailOptions = {
    from: 'gueaserge2@gmail.com',
    to: 'sergeguea.info@gmail.com',
    subject: 'Oggetto prova',
    text: 'Contenuto ciao sono una prova2',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Errore nell\'invio dell\'email:', error);
    } else {
        console.log('Email inviata con successo:', info.response);
    }
});

//Configuro il server di posta elettronica per la ricezione delle email e creo un'istanza dell'oggetto 
//imap per connettermi al server

const config = {
    user: 'gueaserge2@gmail.com',
    password: '**************',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
};

const client = new imap(config);

// creo la funzione per la ricezione delle email

client.connect(() => {
    client.openBox('INBOX', false, () => {
        client.search(['UNSEEN'], (error, results) => {
            if (error) {
                console.log('Errore nella ricerca delle email:', error);
            } else {
                results.forEach((result) => {
                    const fetch = client.fetch(result, { bodies: '' });
                    fetch.on('message', (msg) => {
                        msg.on('body', (stream) => {
                            let buffer = '';
                            stream.on('data', (chunk) => {
                                buffer += chunk.toString('utf8');
                            });
                            stream.on('end', () => {
                                console.log('Contenuto dell\'email:', buffer);
                            });
                        });
                    });
                });
            }
        });
    });
});
