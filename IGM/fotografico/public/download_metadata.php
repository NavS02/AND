<?php

$image = $_GET['file'];

$url = "http://195.231.23.205/fotografico/images/preview/0001/" . $image;

$xml = shell_exec("python3 metadata.py " . escapeshellarg($url));

$xml_filename = pathinfo($image, PATHINFO_FILENAME) . ".xml";

header('Content-Type: application/xml');
header('Content-Disposition: attachment; filename="' . $xml_filename . '"');

echo $xml;
exit;