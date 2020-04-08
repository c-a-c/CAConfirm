import Sheets = GoogleAppsScript.Spreadsheet.Sheet;
import Range = GoogleAppsScript.Spreadsheet.Range;
import { StudentShelf } from './StudentShelf';
// import { Zip } from './Zip';

export class AddDesign /*extends Zip*/ {
  private _sheetsName: Sheets;
  // Add design sheet .
  private _color = {
    red: '#FF0000',
    green: '#00FF00',
    white: '#FFFFFF'
  };

  constructor(sheetsName: Sheets) {
    // super();
    this._sheetsName = sheetsName;
  }

  /**
   *
   */
  public judgeData(studentData: StudentShelf) {
    // let nameArray: string[] = this.getDataFromSheet('B');
    // let numberArray: string[] = this.getDataFromSheet('C');
    for (let counter = 0; counter < studentData.getMaxIndex(); counter++) {
      if (studentData.getList(counter).getFlag()) {
        this.decoration(this._sheetsName.getRange(counter + 1, 3), '◯', this._color.green);
      } else if (
        studentData.getList(counter).getName() === '' ||
        studentData.getList(counter).getNumber() === ''
      ) {
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
