/* jQuery による処理 */
$(function() {

	$(document).ready(function() {

		/* サンプルファイル */
		let fileName = "sample.xml";

		printTable(fileName);

	});

	/* ファイル新規作成ボタン押下時処理 */
	$("#add_xml").on('click', '#add_xml_btn', function() {

		/* 入力フォームからファイル名を取得 */
		let fileName = $("input[id='add_xml_name']").val();
		$("input[id='open_xml_name']").val(fileName);
		addXML(fileName);
		printTable(fileName);

	});

	/* ファイル開く */
	$("#open_xml").on('click', '#open_xml_btn', function() {

		/* 入力フォームからファイル名を取得 */
		let fileName = $("input[id='open_xml_name']").val();

		printTable(fileName);

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

	$("#edit").on('click', '#select_line', function() {

		selectLine();

	});

	$("#table_xml").on('click', 'i', function() {

		togglePwMask("large", $(this).attr('id'));

	});

	$("#table_xml").on('click', 'input', function() {

		if (window.innerWidth <= 992)
			togglePwMask("small", $(this).attr('id'));

	});

	$("#edit").on('click', '#commit_table', function() {

		/* 入力フォームからファイル名を取得 */
		let fileName = $("input[id='open_xml_name']").val();

		replaceLine();
		printTable(fileName, true);

	});

	$("#edit").on('click', '#insert_line', function() {

		/* 入力フォームからファイル名を取得 */
		let fileName = $("input[id='open_xml_name']").val();

		insertLine();
		printTable(fileName, true);

	});

	$("#edit").on('click', '#delete_line', function() {

		/* 入力フォームからファイル名を取得 */
		let fileName = $("input[id='open_xml_name']").val();

		removeLine();
		printTable(fileName, true);

	});

	$("#sort").on('click', 'input', function() {

		/* 入力フォームからファイル名を取得 */
		let fileName = $("input[id='open_xml_name']").val();

		sortSwitchCtl();
		printTable(fileName, true);

	});

	$("#search").on('click', '#search_line', function() {

		/* 入力フォームからファイル名を取得 */
		let fileName = $("input[id='open_xml_name']").val();
		/* 入力フォームから検索文字列を取得 */
		let name = $("input[id='search_name']").val();
		let account = $("input[id='search_account']").val();

		if (name && account) {
			searchLine("both", name, account);
			console.log("name && account");
		} else if (name) {
			searchLine("name", name);
			console.log("name");
		} else if (account) {
			searchLine("account", account);
			console.log("account");
		}

		printTable(fileName, true);

	});

	$("#search").on('click', '#search_reset', function() {

		/* 入力フォームからファイル名を取得 */
		let fileName = $("input[id='open_xml_name']").val();

		syncXML(xmlCloneMain);
		printTable(fileName, true);

	});

	$("#edit").on('click', '#upload_file', function() {

		/* 入力フォームからファイル名を取得 */
		let fileName = $("input[id='edit_file_name']").val();

		uploadXML(fileName);

	});

});
