import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheets = GoogleAppsScript.Spreadsheet.Sheet;
import { StudentShelf } from './StudentShelf';
import { Student } from './Student';

export class Sheet /*extends AbstractOpen*/ {
  protected sheetsUrlForEveryone: string;
  protected sheetsUrlMenbers: string;
  private _sheetsForEveryoneObject: Spreadsheet;
  private _sheetsMenbersObject: Spreadsheet;

  private _sheetForEveryone: Sheets[]; // sheet for publication
  private _sheetSize: number; // sheet for publication of size
  private _sheetsName: Sheets; // sheet for publication of name
  private _sheetMenbers: Sheets[]; // menbers sheet
  private _sheetMenbers_new: Sheets; // menbers sheet

  public constructor(sheetsUrlForEveryone: string, sheetsUrlMenbers: string) {
    this.sheetsUrlForEveryone = sheetsUrlForEveryone;
    // super(sheetsUrlForEveryone);
    this.sheetsUrlMenbers = sheetsUrlMenbers;
    this.openApps();
    this.initialize();
  }

  /**
   * - Create App object .
   */
  public openApps() {
    this._sheetsForEveryoneObject = SpreadsheetApp.openByUrl(this.sheetsUrlForEveryone);
    this._sheetsMenbersObject = SpreadsheetApp.openByUrl(this.sheetsUrlMenbers);
  }

  /**
   * - Initialize field value .
   */
  private initialize() {
    this._sheetForEveryone = this._sheetsForEveryoneObject.getSheets();
    this._sheetSize = this._sheetForEveryone.length;
    /* You should change sheet index when a menbers list was updated . And this is Array type . */
    this._sheetMenbers = this._sheetsMenbersObject.getSheets();
    this._sheetMenbers_new = this._sheetsMenbersObject.getSheets()[1];
  }

  /**
   * - Set sheet name{eventTitle} .
   * @param eventTitle event name
   */
  public setForEveryoneSheetName(eventTitle: string) {
    this._sheetsName = this._sheetsForEveryoneObject.getSheetByName(eventTitle);
    // Logger.log(this._sheetsName);
  }

  /**
   * - Get sheet for everyone .
   * @returns this._sheetsName Sheets
   */
  public getForEveryoneSheet() {
    return this._sheetsName;
  }

  /**
   * - Get sheet registered menbers .
   * @returns this._sheetMenbers Sheets[]
   */
  public getMenbersSheet() {
    return this._sheetMenbers;
  }

  /**
   * - Get a number of students .
   * @returns this._sheetMenbers[1].getLastRow()
   */
  public getSumMember(): number {
    return this._sheetMenbers[1].getLastRow();
  }

  /**
   * - Insert new sheet .
   * @param eventTitle event name
   */
  public insertSheets(eventTitle: string) {
    try {
      SpreadsheetApp.openByUrl(this.sheetsUrlForEveryone).insertSheet(eventTitle, this._sheetSize);
    } catch (error) {
      Logger.log(`warning：${eventTitle}はシートに挿入できません。\n${error}`);
    }
  }

  /**
   * - Copy another sheet and set student name .
   */
  public setStudentName() {
    try {
      // Get data of cell from A to B .
      let getNameFromSheet: string[][] = this._sheetMenbers_new
        .getRange(`A1:B${this.getSumMember()}`)
        .getValues();
      // Copy from sheetMenbers(registered menbers) to sheetsName(to show everyone)
      this._sheetsName.getRange(`A1:B${this.getSumMember()}`).setValues(getNameFromSheet);
    } catch (e) {
      Logger.log(e);
    }
  }

  /**
   * - Get data(student name and number and so on ...) from sheet .
   * @param alphabet sheet row
   * @returns menbersArray string[]
   */
  private getDataFromSheet(alphabet: string): string[] {
    // Copy menbers student's data .
    let studentArray: object[][] = this._sheetMenbers_new
      .getRange(`${alphabet}1:${alphabet}${this.getSumMember()}`) // ex) 'A1:A:100'
      .getValues();
    // Change 1 dimension Array from 2 dimension .
    let menbersArray: string[] = Array.prototype.concat.apply([], studentArray);
    return menbersArray;
  }

  /**
   * - Get data(student name and number and so on ...) from sheet .
   * @param alphabet sheet row
   * @returns menbersArray string[]
   */
  public setStudentData(student: StudentShelf): StudentShelf {
    // student name
    let nameArray: string[] = this.getDataFromSheet('B');
    // student number
    let numberArray: string[] = this.getDataFromSheet('C');
    for (let counter = 0; counter < nameArray.length; counter++) {
      student.appendStudent(new Student(nameArray[counter], numberArray[counter]));
    }
    // Logger.log(`${nameArray} : ${numberArray}`);
    return student;
  }
}
