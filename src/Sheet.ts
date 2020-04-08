import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheets = GoogleAppsScript.Spreadsheet.Sheet;
import { StudentShelf } from './StudentShelf';
import { Student } from './Student';

export class Sheet /*extends AbstractOpen*/ {
  protected sheetsUrlForEveryone: string;
  protected sheetsUrlMembers: string;
  private _sheetsForEveryoneObject: Spreadsheet;
  private _sheetsMembersObject: Spreadsheet;

  private _sheetForEveryone: Sheets[]; // sheet for publication
  private _sheetSize: number; // sheet for publication of size
  private _sheetsName: Sheets; // sheet for publication of name
  private _sheetMembers: Sheets; // Members sheet
  // private _sheetMembers_new: Sheets; // Members sheet

  public constructor(sheetsUrlForEveryone: string, sheetsUrlMembers: string) {
    this.sheetsUrlForEveryone = sheetsUrlForEveryone;
    // super(sheetsUrlForEveryone);
    this.sheetsUrlMembers = sheetsUrlMembers;
    this.openApps();
    this.initialize();
  }

  /**
   * - Create App object .
   */
  public openApps() {
    this._sheetsForEveryoneObject = SpreadsheetApp.openByUrl(this.sheetsUrlForEveryone);
    this._sheetsMembersObject = SpreadsheetApp.openByUrl(this.sheetsUrlMembers);
  }

  /**
   * - Initialize field value .
   */
  private initialize() {
    this._sheetForEveryone = this._sheetsForEveryoneObject.getSheets();
    this._sheetSize = this._sheetForEveryone.length;
    /* You should change sheet index when a Members list was updated . And this is Array type . */
    this._sheetMembers = this._sheetsMembersObject.getSheets()[1];
    // this._sheetMembers_new = this._sheetsMembersObject.getSheets()[1];
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
   * @returns {Sheets} this._sheetsName
   */
  public getForEveryoneSheet(): Sheets {
    return this._sheetsName;
  }

  /**
   * - Get sheet registered Members .
   * @returns {Sheets} this._sheetMembers
   */
  public getMembersSheet(): Sheets {
    return this._sheetMembers;
  }

  /**
   * - Get a number of students .
   * @returns {number} this._sheetMembers.getLastRow()
   */
  public getSumMember(): number {
    return this._sheetMembers.getLastRow();
  }

  /**
   * - Insert new sheet .
   * @param {string} eventTitle event name
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
      let getNameFromSheet: string[][] = this._sheetMembers
        .getRange(`A1:B${this.getSumMember()}`)
        .getValues();
      // Copy from sheetMembers(registered Members) to sheetsName(to show everyone)
      this._sheetsName.getRange(`A1:B${this.getSumMember()}`).setValues(getNameFromSheet);
    } catch (e) {
      Logger.log(e);
    }
  }

  /**
   * - Get data(student name and number and so on ...) from sheet .
   * @param alphabet sheet row
   * @returns MembersArray string[]
   */
  private getDataFromSheet(alphabet: string): string[] {
    // Copy Members student's data .
    let studentArray: object[][] = this._sheetMembers
      .getRange(`${alphabet}1:${alphabet}${this.getSumMember()}`) // ex) 'A1:A100'
      .getValues();
    // Change 1 dimension Array from 2 dimension .
    let MembersArray: string[] = Array.prototype.concat.apply([], studentArray);
    return MembersArray;
  }

  /**
   * - Set data(student name and number and so on ...) from sheet .
   * @param alphabet sheet row
   * @returns {string[]} MembersArray
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
