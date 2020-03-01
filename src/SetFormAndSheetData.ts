import { Property } from './Property';
import { Form } from './Form';
import { Sheet } from './Sheet';
import { AddDesign } from './AddDesign';

export class SetFormAndSheetData {
  private _prop: Property;
  private _form: Form;
  private _sheet: Sheet;
  private _design: AddDesign;
  private _answeredMenber: { [key: string]: boolean } = {};

  public constructor(prop: Property) {
    this._prop = prop;
    this.initialize(this._prop);
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
    /* Get form property */
    this._answeredMenber = this._form.getTitle(this._answeredMenber);
    /* Read sheet */
    this._design = new AddDesign(this._sheet.getMenbersSheet(), this._sheet.getForEveryoneSheet());
    this._design.setStudentName();
    this._design.judgeData(this._answeredMenber);
  }
}
