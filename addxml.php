<?php

$fileName = "./xml/" . basename($_POST['file_name']);

if (file_exists($fileName)) {
	http_response_code(500);
} else {
	if (copy("./xml/sample.xml", $fileName)) {
		echo ($fileName . ' の作成が完了しました。');
	} else {
		http_response_code(500);
	}
}
