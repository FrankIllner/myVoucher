<?

// your uploaded File name

$params = $_GET;
print_r($params);
$filename = $_FILES['file']['name'];

// simple assign Valid file extensions
$valid_extensions = array("jpg","jpeg","png","pdf");

// File extension check logic in PHP
$extension = pathinfo($filename, PATHINFO_EXTENSION);

// here Check extension logic in PHP
if(in_array(strtolower($extension),$valid_extensions) ) {

   //PHP To simple Upload file
   if(move_uploaded_file($_FILES['file']['tmp_name'], "uploads/".$filename)){
      echo 1;
   }else{
      echo 0;
   }
}else{
   echo 0;
}

exit;