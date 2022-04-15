<?php

// To store uploaded files path
$files_arr = array();

if(isset($_FILES['files']['name'])){

   // Count total files
   $countfiles = count($_FILES['files']['name']);

   // Upload directory
   $upload_location = "uploads/";

   // Loop all files
   for($index = 0;$index < $countfiles;$index++){

      if(isset($_FILES['files']['name'][$index]) && $_FILES['files']['name'][$index] != ''){
          // File name
          $filename = $_FILES['files']['name'][$index];

          // Get extension
          $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

          // Valid extensions
          $valid_ext = array("png","jpeg","jpg","pdf","txt","doc","docx");

          // Check extension
          if(in_array($ext, $valid_ext)){

             // File path
             $tag = date("d");
             $monat = date("n");
             $jahr = date("Y");
             $stunde = date("G");
             $currentDate = $tag+$monat+$jahr+$stunde;

             $newfilename = $currentDate."-".$filename;
             $path = $upload_location.$newfilename;

             // Upload file
             if(move_uploaded_file($_FILES['files']['tmp_name'][$index],$path)){
                $files_arr[] = $newfilename;
             }
          }

      }

   }

}

echo json_encode($files_arr);
die;