import Sheets = GoogleAppsScript.Spreadsheet.Sheet;
import Range = GoogleAppsScript.Spreadsheet.Range;
// import { Zip } from './Zip';

export class AddDesign /*extends Zip*/ {
  private _thisYearSheet: Sheets;
  private _sheetsName: Sheets;
  private _allMenbers: number; // Get Sheet(registered menbers) length = How many people .
  // Add design sheet .
  private _color = {
    red: '#FF0000',
    green: '#00FF00',
    white: '#FFFFFF'
  };

  constructor(thisYearSheet: Sheets[], sheetsName: Sheets) {
    // super();
    // You should select sheet index .
    this._thisYearSheet = thisYearSheet[1];
    this._sheetsName = sheetsName;
    this._allMenbers = this._thisYearSheet.getLastRow();
  }

  /**
   * - Copy another sheet and set student name .
   */
  public setStudentName() {
    try {
      // Get data of cell from A to B .
      let getNameFromSheet: string[][] = this._thisYearSheet
        .getRange(`A1:B${this._allMenbers}`)
        .getValues();
      // Copy from sheetMenbers(registered menbers) to sheetsName(to show everyone)
      this._sheetsName.getRange(`A1:B${this._allMenbers}`).setValues(getNameFromSheet);
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
    let studentArray: object[][] = this._thisYearSheet
      .getRange(`${alphabet}1:${alphabet}${this._allMenbers}`) // ex) 'A1:A:100'
      .getValues();
    // Change 1 dimension Array from 2 dimension .
    let menbersArray: string[] = Array.prototype.concat.apply([], studentArray);
    return menbersArray;
  }

  /**
   *
   */
  public judgeData(answeredMenber: { [key: string]: boolean }) {
    let nameArray: string[] = this.getDataFromSheet('B');
    let numberArray: string[] = this.getDataFromSheet('C');
    for (let counter = 0; counter < nameArray.length; counter++) {
      if (answeredMenber[numberArray[counter]]) {
        this.decoration(this._sheetsName.getRange(counter + 1, 3), '◯', this._color.green);
        // Logger.log(numberArray[counter]);
      } else if (numberArray[counter] === '' || numberArray[counter] === null) {
        this.decoration(this._sheetsName.getRange(counter + 1, 3), '', this._color.white);
      } else {
        this.decoration(this._sheetsName.getRange(counter + 1, 3), '×', this._color.red);
      }
    }
  }

  /**
   * Design each cell . For exam: add color, centering ...
   * @param sheet Sheet that everyone can confirm
   * @param mark Set mark . Set '◯' or '×' .
   * @param color Add colors .  Use '_color' .
   */
  public decoration(sheet: Range, mark: string, color: string) {
    // set text in the center
    sheet.setHorizontalAlignment('center');
    // set mark
    sheet.setValue(mark);
    // add a color to text
    sheet.setBackground(color);
  }
}
