<?php
require_once 'phpqrcode/qrlib.php';
$path = 'images/';

if ($_POST['buyVoucherQr']) {
    $buy_id = $_POST['buy_id'];
    $customer_id = $_POST['user_id'];
    $voucher_id = $_POST['offer_voucher_id'];
    $partner_id = $_POST['partner_id'];
    $url = $_POST['url'];
    $status = $_POST['status'];
    $filename = $customer_id."-".$voucher_id.".png";
    $file = $path.$filename;
    $text = 'http://'.$url."/checkQrCode/buyId/".$buy_id."/customerId/".$customer_id."/voucherId/".$voucher_id."/status/".$status;
   
} else {

    $filename = $_POST['voucherId'].".png";
    $file = $path.$filename;
    $text = 'http://'.$_POST['url']."/toBasket/".$_POST['voucherId'];
    
}
print_r($text);
QRcode::png($text, $file, 'M', 3, 2);