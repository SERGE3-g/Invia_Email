<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $destinatario = $_POST['sergeguea.info@gmail.com'];
  $oggetto = $_POST['prova'];
  $corpo = $_POST['ciao sono una prova'];

  $headers = "From: gueaserge2@gmail.com" . "\r\n" .
             "Reply-To: gueaserge2@gmail.com" . "\r\n" .
             "X-Mailer: PHP/" . phpversion();

  if (mail($destinatario, $oggetto, $corpo, $headers)) {
    echo "Email inviata con successo!";
  } else {
    echo "Si è verificato un errore durante l'invio dell'email.";
  }
}
?>


