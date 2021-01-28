/* jQuery による処理 */
$(function() {

	/* ファイル新規作成ボタン押下時処理 */
	$("#open_xml_btn").click(function() {

		/* 入力フォームからファイル名を取得 */
		let fileName = $("input[id='open_xml_name']").val();

		$.ajax({
			type: "GET",
			url: ("./xml/" + fileName),
			dataType: "xml"
		}).done(function(xml) {
			xml_clone = xml;
			$("#table_name").empty();
			$("#table_xml").empty();
			printTable(xml, fileName);
			printButton();
		}).fail(function() {
			alert("XMLファイルの取得に失敗しました");
		});

	});

	/* 編集モード切替スイッチ使用時の処理 */
	$("#edit_mode").click(function() {
		
		printExpFuncsCtl("#edit_mode");

	});

	/* 並べ替え機能切替スイッチ使用時の処理 */
	$("#sort_mode").click(function() {
		
		printExpFuncsCtl("#sort_mode");

	});

	/* 検索機能切替スイッチ使用時の処理 */
	$("#search_mode").click(function() {

		printExpFuncsCtl("#search_mode");
				
	});

});

/* 以下は独自関数エリア */

function printTable(x, n) {

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

	/* テーブルを変数に出力する */
	$("#table_xml").append(tableBase);

	/* 一行ずつXMLファイルを読み出し変数に出力 */
	$(x).find("service").each(function(i) {
		let radio= '<tr><td>' +
			'<label>' +
			'<input class="with-gap" type="radio" name="check" value="' + i + '"/>' +
			'<span></span></label></td>';
		let name = '<td>' + $(this).find("name").text() + '</td>';
		let account = '<td>' + $(this).find("account").text() + '</td>';
		let password = '<td>' + $(this).find("password").text() + '</td></tr>';
		$("#table_xml tbody").append(radio + name + account + password);
	});

	/* ファイル名を表示する */
	$("#table_name").append("<h6>ファイル名：" + n + "</h6>");

}

/* 拡張機能群出力コントローラー */
function printExpFuncsCtl(m) {

	/* 各機能が有効化されているかの真偽値を取得 */
	let edit_mode = $("#edit_mode").prop('checked');
	let sort_mode = $("#sort_mode").prop('checked');
	let search_mode = $("#search_mode").prop('checked');
	let clicked_mode = $(m).prop('checked');

	switch (m) {
		case "#edit_mode":
			/* 他のモードが無効である場合、
			 * 非表示にして余白を縦の余白をつぶす */
			if (sort_mode == false)
				$("#sort").hide();
			if (search_mode == false)
				$("#search").hide();
			if (clicked_mode) {
				/* 有効化の対象は表示しておく */
				$("#edit").show();
				/* 画面に出力 */
				printEdit();
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
			if (edit_mode == false)
				$("#edit").hide();
			if (search_mode == false)
				$("#search").hide();
			if (clicked_mode) {
				/* 有効化の対象は表示しておく */
				$("#sort").show();
				/* 画面に出力 */
				printSort();
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
			if (edit_mode == false)
				$("#edit").hide();
			if (sort_mode == false)
				$("#sort").hide();
			if (clicked_mode) {
				/* 有効化の対象は表示しておく */
				$("#search").show();
				/* 画面に出力 */
				printSearch();
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
function printEdit() {

	/* 編集カードを準備 */
	let editCard =
		'<div class="col s12 m12 m6">' +
		'<div class="card">' +
		'<div class="card-stacked">' +
		'<div class="card-content">' +
		'<h6>編集</h6>' +
		'</div>' +
		'<div class="card-content">' +
		'<button class="btn waves-effect waves-light social-distance">行選択' +
		'<i class="material-icons right">mode_edit</i>' +
		'</button>' +
		'<button class="btn waves-effect waves-light social-distance red lighten-2">削除' +
		'<i class="material-icons right">delete</i>' +
		'</button>' +
		'</div>' +
		'<div class="card-content">' +
		'<div class="row">' +
		'<div class="input-field col s12 m12 l12">' +
		'<input placeholder="例) Baidu" id="edit_name" type="text" class="validate" />' +
		'<label for="edit_name">サービス名</label>' +
		'</div>' +
		'<div class="input-field col s12 m12 l12">' +
		'<input placeholder="例) https://www.baidu.com" id="edit_url" type="text" class="validate" />' +
		'<label for="edit_url">サービスURL</label>' +
		'</div>' +
		'<div class="input-field col s12 m12 l12">' +
		'<input placeholder="例) hoge" id="edit_account" type="text" class="validate" />' +
		'<label for="edit_account">アカウント名</label>' +
		'</div>' +
		'<div class="input-field col s12 m12 l12">' +
		'<input placeholder="例) wahahauhaha" id="edit_password" type="password" class="validate" />' +
		'<label for="edit_password">パスワード</label>' +
		'</div>' +
		'</div>' +
		'<button class="btn waves-effect waves-light social-distance light-blue lighten-2">追加' +
		'<i class="material-icons right">send</i>' +
		'</button>' +
		'<button class="btn waves-effect waves-light social-distance">変更確定' +
		'<i class="material-icons right">check</i>' +
		'</button>' +
		'</div>' +
		'</div>'; 

	$("#edit").append(editCard);
	M.updateTextFields();

}

/* 検索機能出力関数 */
function printSearch() {

	/* 検索カードを準備 */
	let searchCard =
		'<div class="col s12 m12 m6">' +
		'<div class="card">' +
		'<div class="card-stacked">' +
		'<div class="card-content">' +
		'<h6>検索</h6>' +
		'</div>' +
		'<div class="card-content">' +
		'<div class="row">' +
		'<div class="input-field col s12 m12 l12">' +
		'<input placeholder="例) Baidu" id="search_name" type="text" class="validate" />' +
		'<label for="search_name">サービス名</label>' +
		'</div>' +
		'<div class="input-field col s12 m12 l12">' +
		'<input placeholder="例) Unko" id="search_account" type="text" class="validate" />' +
		'<label for="search_account">アカウント名</label>' +
		'</div>' +
		'</div>' +
		'<button class="btn waves-effect waves-light">検索' +
		'<i class="material-icons right">search</i>' +
		'</button>' +
		'</div>' +
		'</div>' +
		'</div>'; 

	$("#search").append(searchCard);
	M.updateTextFields();

}

function printButton() {

}
