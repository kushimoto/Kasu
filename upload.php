<?php

$fileName = basename($_POST['file_name']);
$xml = basename($_POST['file']);

$fp = fopen( ("./xml/" . $fileName), "w");
fwrite($fp, $xml);
fclose($fp);

if ($fp) {
	echo ($fileName . ' は正常にアップロードされました。');
} else {
	http_response_code(500);
}
