import { Property } from './Property';
import { Form } from './Form';
import { Sheet } from './Sheet';
import { AddDesign } from './AddDesign';
import { StudentShelf } from './StudentShelf';
import { Student } from './Student';

export class SetFormAndSheetData {
  private _prop: Property;
  private _form: Form;
  private _sheet: Sheet;
  private _design: AddDesign;
  private _answeredMenber: { [key: string]: boolean } = {};
  private _sumStudent: number;
  private _studentNumberList: String[];

  public constructor(prop: Property) {
    this._prop = prop;
    this.initialize(this._prop);
    this._studentNumberList = [];
  }

  private initialize(prop: Property) {
    this._form = new Form(prop.getForm);
    this._sheet = new Sheet(prop.getSheetForEveryone, prop.getSheetMenbers);
  }

  /**
   * makeSheet
   * @param
   * @returns
   */
  public makeSheet() {
    /* Insert new sheet */
    this._sheet.setForEveryoneSheetName(this._prop.getEventName);
    this._sheet.insertSheets(this._prop.getEventName);

    /* Get number of students */
    this._sumStudent = this._sheet.getSumMember();

    /* Set student data */
    let studentShelf: StudentShelf = new StudentShelf(this._sumStudent);

    /* Get form property */
    // this._answeredMenber = this._form.getTitle(this._answeredMenber);
    /* Read sheet */
    this._design = new AddDesign(this._sheet.getMenbersSheet(), this._sheet.getForEveryoneSheet());
    this._sheet.setStudentName();
    studentShelf = this._sheet.setStudentData(studentShelf);

    // for (let item = 0; item < studentShelf.getMaxIndex(); item++) {
    //   Logger.log(
    //     `${item} -> ${studentShelf.getList(item).getName()} ${studentShelf
    //       .getList(item)
    //       .getNumber()} : ${studentShelf.getList(item).getFlag()}`
    //   );
    // }

    /* Get form property */
    this._studentNumberList = this._form.getTitle();

    /* Change stundet flag */
    for (let counter = 0; counter < studentShelf.getMaxIndex(); counter++) {
      for (const arrayItem in this._studentNumberList) {
        if (studentShelf.getList(counter).getNumber() == this._studentNumberList[arrayItem]) {
          // Set true flag for student
          studentShelf.getList(counter).setFlag();
          Logger.log(studentShelf.getList(counter).getNumber());
        }
      }
    }
    Logger.log(studentShelf.getMaxIndex());

    this._design.judgeData(studentShelf);
  }
}
