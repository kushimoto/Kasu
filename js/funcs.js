/* パスワード台帳出力用関数 */
function printTable(fn) {

	/* ベースとなるテーブルを準備 */
	let tableBase =
		'<table class="striped responsive-table"><thead>' +
		'<tr><th></th>' +
		'<th>サービス名</th>' +
		'<th>アカウント名</th>' +
		'<th>パスワード</th>' +
		'</tr></thead>' +
		'<tbody></tbody>' +
		'</table>';

	$.ajax({
		type: "GET",
		url: ("./xml/" + fn),
		dataType: "xml"
	}).done(function(xml) {
		/* クローンを作成 */
		xml_clone = xml;
		/* テーブル表示領域を初期化 */
		$("#table_name").empty();
		$("#table_xml").empty();
		/* テーブルヘッダを出力 */
		$("#table_xml").append(tableBase);
		/* 一行ずつXMLファイルを読み出し変数に出力 */
		$(xml).find("service").each(function(i) {
			let radio =
				'<tr><td>' +
				'<label>' +
				'<input class="with-gap" type="radio" name="check" value="' + i + '"/>' +
				'<span></span></label></td>';
			let name = '<td>' + $(this).find("name").text() + '</td>';
			let account = '<td>' + $(this).find("account").text() + '</td>';
			let password = '<td>' + $(this).find("password").text() + '</td></tr>';
			$("#table_xml tbody").append(radio + name + account + password);
		});
		/* ファイル名を表示する */
		$("#table_name").append("<h6>ファイル名：" + fn + "</h6>");
	}).fail(function() {
		alert("XMLファイルの取得に失敗しました");
	});

}

/* 拡張機能群出力コントローラー */
function printExpFuncsCtl(m) {

	/* 各機能が有効化されているかの真偽値を取得 */
	let editMode = $("#edit_mode").prop('checked');
	let sortMode = $("#sort_mode").prop('checked');
	let searchMode = $("#search_mode").prop('checked');
	let clickedMode = $(m).prop('checked');

	switch (m) {
		case "#edit_mode":
			/* 他のモードが無効である場合、
			 * 非表示にして余白を縦の余白をつぶす */
			if (sortMode == false)
				$("#sort").hide();
			if (searchMode == false)
				$("#search").hide();
			if (clickedMode) {
				/* 有効化の対象は表示しておく */
				$("#edit").show();
				/* 画面に出力 */
				printEditCard();
			} else {
				/* 消去 */
				$("#edit").empty();
				/* 非表示にする */
				$("#edit").hide();
			}
			break;
		case "#sort_mode":
			/* 他のモードが無効である場合、
			 * 非表示にして余白を縦の余白をつぶす */
			if (editMode == false)
				$("#edit").hide();
			if (searchMode == false)
				$("#search").hide();
			if (clickedMode) {
				/* 有効化の対象は表示しておく */
				$("#sort").show();
				/* 画面に出力 */
				printSortCard();
			} else {
				/* 消去 */
				$("#sort").empty();
				/* 非表示にする */
				$("#sort").hide();
			}
			break;
		case "#search_mode":
			/* 他のモードが無効である場合、
			 * 非表示にして余白を縦の余白をつぶす */
			if (editMode == false)
				$("#edit").hide();
			if (sortMode == false)
				$("#sort").hide();
			if (clickedMode) {
				/* 有効化の対象は表示しておく */
				$("#search").show();
				/* 画面に出力 */
				printSearchCard();
			} else {
				/* 消去 */
				$("#search").empty();
				/* 非表示にする */
				$("#search").hide();
			}
			break;
	}

}

/* 編集モード出力関数 */
function printEditCard() {

	$.ajax({
		type: "GET",
		url: ("./parts/edit.html"),
		dataType: "html"
	}).done(function(html) {
		$("#edit").append(html);
		M.updateTextFields();
	}).fail(function() {
		alert("HTMLファイルの取得に失敗しました");
	});

}

/* 並べ替え機能出力関数 */
function printSortCard() {

	$.ajax({
		type: "GET",
		url: ("./parts/sort.html"),
		dataType: "html"
	}).done(function(html) {
		$("#sort").append(html);
		M.updateTextFields();
	}).fail(function() {
		alert("HTMLファイルの取得に失敗しました");
	});

}


/* 検索機能出力関数 */
function printSearchCard() {

	$.ajax({
		type: "GET",
		url: ("./parts/search.html"),
		dataType: "html"
	}).done(function(html) {
		$("#search").append(html);
		M.updateTextFields();
	}).fail(function() {
		alert("HTMLファイルの取得に失敗しました");
	});
		
}
