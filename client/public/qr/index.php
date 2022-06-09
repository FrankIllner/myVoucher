<?php
require_once 'phpqrcode/qrlib.php';
$path = 'images/';
$filename = $_POST['voucherId'].".png";

$file = $path.$filename;
$text = 'http://'.$_POST['url']."/toBasket/".$_POST['voucherId'];

QRcode::png($text, $file, 'M', 3, 2);