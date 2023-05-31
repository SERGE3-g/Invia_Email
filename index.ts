import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/incoming-email', (req, res) => {
  const { from, to, subject, body } = req.body;
  // Gestisco l'email in arrivo come preferisco
  console.log('Nuova email in arrivo:');
  console.log('Da:', from);
  console.log('A:', to);
  console.log('Oggetto:', subject);
  console.log('Testo:', body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});


// Ora posso configurare il modulo di invio delle email
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'gueaserge2@gmail.com',
        pass: '**************',
  },
});

const sendEmail = async (to: string, subject: string, body: string) => {
  const mailOptions = {
    from: 'gueaserge2@gmail.com',
    to: 'sergeguea.info@gmail.com',
    subject:'prova',
    text: 'ciao sono una prova',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email inviata:', info.messageId);
  } catch (error) {
    console.error('Errore durante l\'invio dell\'email:', error);
  }
};

// Esempio di invio di un'email
sendEmail('sergeguea.info@gmail.com', 'prova', 'ciao sono una prova2');




