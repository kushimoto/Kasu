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
		/* メインクローンを作成 */
		xmlCloneMain = xml.cloneNode(true);
		/* 表示用クローンを作成 */
		xmlClone = xml.cloneNode(true);
		/* XMLをHTMLに変換して出力 */
		convertXMLtoHTML(xml, fn);
	}).fail(function() {
		swal("エラー", "XMLファイルの取得に失敗しました", "error");
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

function syncXML(x) {

	xmlClone = x.cloneNode(true);

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
		swal("エラー", "HTMLファイルの取得に失敗しました", "error");
	});
		
}

/* パスワード可視切替関数 */
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
		line = $(xmlCloneMain).find("service:nth-child(" + lineNum + ")");
	} catch(e) {
		swal("エラー", "編集対象の行を選んで下さい！", "error");
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

	syncXML(xmlCloneMain);
}

/* 行挿入関数 */
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
		$(xmlCloneMain).find("service:nth-child(" + lineNum + ")").after(addLine);
	} catch (e) {
		swal("エラー", "挿入箇所を選んで下さい！", "error");
		console.log(e);
	}

	syncXML(xmlCloneMain);
}

/* 行削除関数 */
function removeLine() {

	/* 行番号 */
	let lineNum = Number($("input[name=check]:checked").val()) + 1;
	try {
		/* 行そのもの削除 */
		$(xmlCloneMain).find("service:nth-child(" + lineNum + ")").remove();
	} catch(e) {
		swal("エラー", "削除する行を選んで下さい", "error");
		console.log(e);
	}

	syncXML(xmlCloneMain);

}

/* 行編集関数 */
function replaceLine() {

	/* 行番号 */
	let lineNum = Number($("input[name=check]:checked").val()) + 1;
	let line = null;
	try {
		/* 行そのもの */
		line = $(xmlCloneMain).find("service:nth-child(" + lineNum + ")");
	} catch(e) {
		swal("エラー", "編集対象の行を選んで下さい！", "error");
		console.log(e);
		return ;
	}

	line.find("name").replaceWith($("<name></name>").text($("#edit_name").val()));
	line.find("url").replaceWith($("<url></url>").text($("#edit_url").val()));
	line.find("account").replaceWith($("<account></account>").text($("#edit_account").val()));
	line.find("password").replaceWith($("<password></password>").text($("#edit_password").val()));

	syncXML(xmlCloneMain);
}

/* ソートスイッチコントローラー関数 */
function sortSwitchCtl() {

	/* それぞれのスイッチの状態 真偽値 */
	let nameAsc = $("#name_asc:checked").val();
	let nameDesc = $("#name_desc:checked").val();
	let accountAsc = $("#account_asc:checked").val();
	let accountDesc = $("#account_desc:checked").val();
	/* 項目ごとのソート使用状況 真偽値 */
	let name = ( (nameAsc == undefined) && (nameDesc == undefined) );
	let account = ( (accountAsc == undefined) && (accountDesc == undefined) );

	/* スイッチの無効化 解除 */
	if (name) {
		$("#name_asc").prop('disabled', false);
		$("#name_desc").prop('disabled', false);
	}
	if (account) {
		$("#account_asc").prop('disabled', false);
		$("#account_desc").prop('disabled', false);
	}

	/* サービス名でソート */
	if (nameAsc || nameDesc) {
		if (nameAsc) { /* 昇順 */
			/* 降順無効化 */
			$("#name_desc").prop('disabled', true);
			sortTable("name", "asc");
		} else if (nameDesc) { /* 降順 */
			/* 昇順無効化 */
			$("#name_asc").prop('disabled', true);
			sortTable("name", "desc");
		}
	}
	/* アカウント名でソート */
	if (accountAsc || accountDesc) {
		if (accountAsc) { /* 昇順 */
			/* 降順無効化 */
			$("#account_desc").prop('disabled', true);
			sortTable("account", "asc");
		} else if (accountDesc) { /* 降順 */
			/* 昇順無効化 */
			$("#account_asc").prop('disabled', true);
			sortTable("account", "desc");
		}
	}

	/* 両方の項目でソートが無効化された場合にテーブルを初期化 */
	if (name && account) {
		syncXML(xmlCloneMain);
	}

}

/* ソート関数 */
function sortTable(col, mode){

	let services = $(xmlClone).find("services");
	let service = $(services).children();
	let pwbook = new Array();

	/* 連想配列の作成 */
	for(let i = 0; i < service.length; i++) {
		pwbook[i] = {idx: i, key: $(service[i]).find(col).text()};
	}

	/* 連想配列をソート */
	pwbook.sort(function(a, b) {
		if (mode == "asc") { /* 昇順 */
			if( a.key <= b.key )
				return -1;
			else
				return 1;
		} else if (mode == "desc") { /* 降順 */
			if( a.key <= b.key )
				return 1;
			else
				return -1;
		}
	});

	// 表の要素の並べ替え
	$(services).empty();
	for(let i = 0; i < service.length; i++){
		$(services).append(service[pwbook[i].idx]);
	}
}

/* 検索関数 */
function searchLine(type, s1, s2) {

	/* 出力用 */
	let services = $(xmlClone).find("services");
	/* 一致行格納用 */
	let service = null;
	/* 空にする */
	$(services).empty();

	/* serviceタグを全件探索 */
	$(xmlCloneMain).find("service").each(function() {
		if (s2 == undefined) {
			/* 要素を全件探索 */
			$(this).find(type).each(function() {
				/* 部分一致 */
				if ($(this).text().indexOf(s1) > -1) {
					/* 一致したため変数に追加 */
					service = $(this).parent().clone();
					$(services).append(service);
				}
			});
		} else {
			/* nameタグを全件探索 */
			$(this).find("name").each(function() {
				/* name と account の両方が部分一致 */
				if ( ($(this).text().indexOf(s1) > -1) && ($(this).parent().find("account").text().indexOf(s2) > -1) ) {
					/* 一致したため変数に追加 */
					service = $(this).parent().clone();
					$(services).append(service);
				}
			});
		}

	});
}

function uploadXML(fn) {

	let serializer = new XMLSerializer();
	let xml_serialize = serializer.serializeToString(xmlCloneMain);

	$.ajax({
		type: 'POST',
		url: './upload.php',
		cache: false,
		datatype: 'json',
		data: {
			'file_name': fn,
			'file': xml_serialize
		}
	}).done(function(respons) {
		swal("成功", respons, "success");
	}).fail(function() {
		swal("エラー", "ファイルのアップロードに失敗しました", "error");
	});

}

function addXML(fn) {

	$.ajax({
		type: 'POST',
		url: './addxml.php',
		cache: false,
		datatype: 'json',
		data: {
			'file_name': fn,
		}
	}).done(function(respons) {
		swal("成功", respons, "success");
	}).fail(function() {
		swal("エラー", "ファイルの新規作成に失敗しました", "error");
	});

}
