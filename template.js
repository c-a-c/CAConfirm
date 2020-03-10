/*
** @author : wolf
** @date : 2020/3/11
** template code. (Deleted spreadsheet URL.)
** claspを用いない方法(うんコード)
** @necesaary : 
**  - @param GOOGLE_FORM_URL : GoogleFormURL(編集権限付き)
**  - @param SHEET_TITLE : 行事
**  - @param SPREADSHEET_FOR_CAC_MEMBERS : 部員公開用SpreadSheetURL(編集権限付き)
**  - @param membersSpreadSheet : 部員の情報を載せたSpreadSheetURL(編集権限付き)
*/

var GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/1qygE42Iwdlue3r8huR2DwFcvdidZIb0SuzFZWZp4hGs/edit?usp=sharing',
    SHEET_TITLE = 'sampleeeee';
    
var GOOGLE_FORM = FormApp.openByUrl(GOOGLE_FORM_URL),
    //部員に見せるスプレッドシート。(公開用)
    SPREADSHEET_FOR_CAC_MEMBERS = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/12a2QcY7td8L5l-T0KQ_mCxwt7bmm0cuAGMDlZDngOmE/edit?usp=sharing'),
    //部員の名前が書かれたシートのURL。(参照用)
    membersSpreadSheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/12a2QcY7td8L5l-T0KQ_mCxwt7bmm0cuAGMDlZDngOmE/edit?usp=sharing').getSheets()[1];

try {
  //閲覧用にシートを前から順に追加していく。
  var newSheet = SPREADSHEET_FOR_CAC_MEMBERS.insertSheet(SHEET_TITLE, SPREADSHEET_FOR_CAC_MEMBERS.getSheets().length);
}catch (error) {
  Logger.log('シートの番号は ' + SPREADSHEET_FOR_CAC_MEMBERS.getSheets().length);
}

var formSheets = SPREADSHEET_FOR_CAC_MEMBERS.getSheetByName(SHEET_TITLE);

var nameHash = {}, //Dictionaryの初期化
    cacArray = [], //部員一覧を格納するための配列の初期化
    color = {
      red: '#FF0000', 
      green: '#00FF00', 
      white: '#FFFFFF'
    };
/* -------------------------------------------------------------------------------------------------- */

/* トリガーの設定 */
function setTriggar(){
//  var triggers = ScriptApp.getProjectTriggers();
//  for(var i=0; i < triggers.length; i++) {
//    ScriptApp.deleteTrigger(triggers[i]);
//  }
  try{
    ScriptApp.newTrigger('copyAndPaste')
    .forForm(GOOGLE_FORM)
    .onFormSubmit()
    .create();
  } catch(error){
     Logger.log('Miss');
  }
  copyAndPaste();
}

/* スプレッドシートの読み込み */
function copyAndPaste(){
  //最終列を取得。
  var menberCount = membersSpreadSheet.getLastRow();
//  Logger.log(menberCount);

  //部員メンバー一覧からコピペ
  var copyValue = membersSpreadSheet.getRange('A1:B' + menberCount).getValues();
  formSheets.getRange('A1:B' + menberCount).setValues(copyValue);

  var cacMember = formSheets.getRange('B1:B' + menberCount).getValues();
  cacArray = Array.prototype.concat.apply([], cacMember); //2次元から1次元配列へ

  printData();
}

/* タイトルの取得 */
function printData(){
  var formResponses = GOOGLE_FORM.getResponses();
  
  for(var items in formResponses){
    var formRes = formResponses[items],
        itemRes = formRes.getItemResponses();

    for(var item in itemRes){
      var itemResponse = itemRes[item]; //'名前', '意見'が入ってる(配列)
      var nameColumn = itemResponse.getItem().getTitle();
      //名前カラムが一致した時
      if( nameColumn.match('名前') || nameColumn.match('氏名') ){ 
        putData( itemResponse.getResponse() ); //名前の追加と初期化
      }
    }
  }
  judge();
}

/* 初期化とデータの格納 */
function putData(name){ //配列形式で渡す
  //{'名前': true}
  name = name.replace( /\s+/g, "" ); //名前間に空白があった場合、削除される。
  nameHash[name] = true; //全てのユーザの真偽値をtrueに。
  // manual('');
}

function judge(){
  var count = 0; //行番号

  for(var index in cacArray){
      if( nameHash[ cacArray[index] ] ){
        decorateGreen( formSheets.getRange(count+1, 3) ); //飾り
      }else if(cacArray[index] == "" || cacArray[index] == null){
        decorateWhite( formSheets.getRange(count+1, 3) ); //飾り
      }else{
        decorateRed( formSheets.getRange(count+1, 3) ); //飾り
      }
    count++; 
  }
//  Logger.log(cacArray.length);
}

/* 背景色付け・○×表記・中央寄せ */
function decorateGreen(sheetRange){
  sheetRange.setHorizontalAlignment('center'); //中央寄せ
  sheetRange.setValue("○"); //3列目に○を入力する。
  sheetRange.setBackground(color.green); //背景色
}
function decorateRed(sheetRange){
    sheetRange.setHorizontalAlignment('center'); //中央寄せ
    sheetRange.setValue("×"); //3列目に×を入力する。
    sheetRange.setBackground(color.red); //背景色
}
function decorateWhite(sheetRange){
    sheetRange.setValue(""); //3列目に空白を入力する。
    sheetRange.setBackground(color.white); //飾り
}

/* 手動用関数 */
function manual(errorName){
  nameHash[errorName] = true;
}