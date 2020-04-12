import { Property } from './Property';
import { Form } from './Form';
import { Sheet } from './Sheet';
import { AddDesign } from './AddDesign';
import { StudentShelf } from './StudentShelf';
import { Trigger } from './Trigger';

export class SetFormAndSheetData {
  private _prop: Property;
  private _form: Form;
  private _sheet: Sheet;
  private _design: AddDesign;

  public constructor() {
    this._prop = new Property();
    this._form = new Form(this._prop.getForm);
    this._sheet = new Sheet(this._prop.getSheetForEveryone, this._prop.getSheetMenbers);
  }

  /**
   * - Set trigger and run all .
   */
  public run() {
    const trigger: Trigger = new Trigger();
    trigger.setTrigger(this._form);
    this.makeSheet();
  }

  /**
   * - Connect Form and Sheet data .
   */
  private makeSheet() {
    /* Insert new sheet */
    this._sheet.setForEveryoneSheetName(this._prop.getEventName);
    this._sheet.insertSheets(this._prop.getEventName);

    /* Get number of students */
    const sumStudent: number = this._sheet.getSumMember();

    /* Set student data */
    let studentShelf: StudentShelf = new StudentShelf(sumStudent);

    /* Read sheet */
    this._design = new AddDesign(this._sheet.getForEveryoneSheet());
    this._sheet.setStudentName();
    studentShelf = this._sheet.setStudentData(studentShelf);

    /* Get form property */
    let studentNumberList: String[] = [];
    studentNumberList = this._form.getTitle();

    /* Change stundet flag */
    for (let counter = 0; counter < studentShelf.getMaxIndex(); counter++) {
      for (const arrayItem in studentNumberList) {
        if (studentShelf.getList(counter).getNumber() == studentNumberList[arrayItem]) {
          // Set true flag for student
          studentShelf.getList(counter).setFlag();
          // Logger.log(studentShelf.getList(counter).getNumber());
        }
      }
    }
    // Logger.log(studentShelf.getMaxIndex());

    this._design.judgeData(studentShelf);
  }
}
