/* jQuery による処理 */
$(function() {

	$(document).ready(function() {

		/* サンプルファイル */
		let fileName = "sample.xml";

		printTable(fileName);

	});

	/* ファイル新規作成ボタン押下時処理 */
	$("#open_xml_btn").click(function() {

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

	$("#edit").on('click', '#dicision', function() {

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

});
