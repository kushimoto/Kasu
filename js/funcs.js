/* パスワード台帳出力用関数 */
function printTable(fn, reload = false) {

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

	/* テーブル表示領域を初期化 */
	$("#table_name").empty();
	$("#table_xml").empty();
	/* テーブルヘッダを出力 */
	$("#table_xml").append(tableBase);

	/* XMLの変更を反映する */
	if (reload == true) {
		/* XMLをHTMLに変換して出力 */
		convertXMLtoHTML(xmlClone, fn);
		return;
	}

	$.ajax({
		type: "GET",
		url: ("./xml/" + fn),
		dataType: "xml"
	}).done(function(xml) {
		/* クローンを作成 */
		xmlClone = xml;
		/* XMLをHTMLに変換して出力 */
		convertXMLtoHTML(xml, fn);
	}).fail(function() {
		alert("XMLファイルの取得に失敗しました");
	});
	
}

function convertXMLtoHTML(x, fn) {

	/* 一行ずつXMLファイルを読み出し変数に出力 */
	$(x).find("service").each(function(i) {
		/* ラジオボタン生成 */
		let radio =
			'<tr><td>' +
			'<label>' +
			'<input class="with-gap" type="radio" name="check" value="' + i + '"/>' +
			'<span></span></label></td>';
		/* サービス名用タグ生成 */
		let name = '<td><a href="' + $(this).find("url").text() + '"target="_blank" rel="noopener noreferrer">' + $(this).find("name").text() + '</a></td>';
		/* アカウント名用タグ生成 */
		let account = '<td>' + $(this).find("account").text() + '</td>';
		/* パスワード用タグ生成 */
		let password = 
			'<td class="valign-wrapper">' +
			'<input id="pw' + i + '" type="password" class="password-box" value="' +
			$(this).find("password").text() + 
			'" readonly >' +
			'<i id="pws' + i + '" class="material-icons hide-on-small-only hide-on-med-only" style="user-select: none;">visibility</i>' +
			'</td></tr>';
		/* １行出力 */
		$("#table_xml tbody").append(radio + name + account + password);
	});
	/* ファイル名を表示する */
	$("#table_name").append("<h6>ファイル名：" + fn + "</h6>");

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
				printExpFuncs("edit");
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
				printExpFuncs("sort");
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
				printExpFuncs("search");
			} else {
				/* 消去 */
				$("#search").empty();
				/* 非表示にする */
				$("#search").hide();
			}
			break;
	}

}

/* 拡張機能出力関数 */
function printExpFuncs(f) {

	$.ajax({
		type: "GET",
		url: ("./parts/" + f + ".html"),
		dataType: "html"
	}).done(function(html) {
		$("#" + f).append(html);
		M.updateTextFields();
	}).fail(function() {
		alert("HTMLファイルの取得に失敗しました");
	});
		
}

function togglePwMask(type, str) {

	let target = '#' + str;
	let pw = (type == "small" ? $(target) : $(target).prev("input"));

	if (pw.attr("type") == "password") {
		pw.attr("type", "text");
		if (type != "small")
			$(target).text("visibility_off");
	} else {
		pw.attr("type", "password");
		if (type != "small")
			$(target).text("visibility");
	}

}

/* 選択ボタンの処理 */
function selectLine() {

	/* 行番号 */
	let lineNum = Number($("input[name=check]:checked").val()) + 1;
	let line = null;
	try {
		/* 行そのもの */
		line = $(xmlClone).find("service:nth-child(" + lineNum + ")");
	} catch(e) {
		alert("編集対象の行を選んで下さい！");
		console.log(e);
		return ;
	}
	let name = line.find("name").text();
	let url = line.find("url").text();
	let account = line.find("account").text();
	let password = line.find("password").text();

	$("input#edit_name").val(name);
	$("#edit_url").val(url);
	$("#edit_account").val(account);
	$("#edit_password").val(password);
	$("#edit_file_name").val($("input[id='open_xml_name']").val());

}

function insertLine() {

	/* 追加行ベース */
	let addLine = $("<service></service>");
	/* 行番号 */
	let lineNum = Number($("input[name=check]:checked").val()) + 1;

	$(addLine).append(
		'<name>' + $("#edit_name").val() + '</name>' +
		'<url>' + $("#edit_url").val() + '</url>' +
		'<account>' + $("#edit_account").val() + '</account>' +
		'<password>' + $("#edit_password").val() + '</password>'
	);

	try {
		$(xmlClone).find("service:nth-child(" + lineNum + ")").after(addLine);
	} catch (e) {
		alert("挿入箇所を選んで下さい！");
		console.log(e);
	}
}

function removeLine() {

	/* 行番号 */
	let lineNum = Number($("input[name=check]:checked").val()) + 1;
	try {
		/* 行そのもの削除 */
		$(xmlClone).find("service:nth-child(" + lineNum + ")").remove();
	} catch(e) {
		alert("削除する行を選んで下さい");
		console.log(e);
	}

}

function replaceLine() {

	/* 行番号 */
	let lineNum = Number($("input[name=check]:checked").val()) + 1;
	let line = null;
	try {
		/* 行そのもの */
		line = $(xmlClone).find("service:nth-child(" + lineNum + ")");
	} catch(e) {
		alert("編集対象の行を選んで下さい！");
		console.log(e);
		return ;
	}

	line.find("name").replaceWith($("<name></name>").text($("#edit_name").val()));
	line.find("url").replaceWith($("<url></url>").text($("#edit_url").val()));
	line.find("account").replaceWith($("<account></account>").text($("#edit_account").val()));
	line.find("password").replaceWith($("<password></password>").text($("#edit_password").val()));

}
