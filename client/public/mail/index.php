<?php
 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../vendor/autoload.php';

$mail = new PHPMailer(true); 

if ($_POST['sendMailRegist']) {
    try {
        //Server settings
        // $mail->SMTPDebug = 2; //Uncomment to view debug log
        
        $mail->isSMTP();
        $mail->Host = 'smtp.web.de';
        $mail->SMTPAuth = true;
        $mail->Username = 'frankillner@web.de';
        $mail->Password = '10Hacky30#';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        
    
        $mail->setFrom('frankillner@web.de', 'Admin');
        $mail->addAddress($_POST['mail'], 'Recipient1');
        $mail->addReplyTo('noreply@example.com', 'noreply');
        //$mail->addCC('cc@example.com');
        //$mail->addBCC('bcc@example.com');
    
        //Attachments
        //$mail->addAttachment('/backup/test.log');
    
        //Content
        $link= 'https://'.$_POST['url']."/activated/userId/".$_POST['user_id'];
   
        $mail->isHTML(true); 
        $mail->Subject = 'Deine Registrierung bei Kieztreu!';
        $mail->Body    = 'Hallo' . $_POST['name']. '! <br /> <br />' . 'Mit diesem Link kannst du deinen Account freischalten: </ br><a href="'.$link.'">Account freischalten</a>';
    
        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    }
}