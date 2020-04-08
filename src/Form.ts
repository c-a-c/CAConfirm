import Forms = GoogleAppsScript.Forms.Form;
import FormsResponse = GoogleAppsScript.Forms.FormResponse;
import FormItemResponse = GoogleAppsScript.Forms.ItemResponse;
import { Check } from './Check';

export class Form /*extends AbstractOpen*/ {
  private url: string; // Google Form URL with editing authority via Property Class .
  private _formObject: Forms;
  private _formResponses: FormsResponse[];

  public constructor(formUrl: string) {
    this.url = formUrl;
    // super(formUrl);
    this.initialize();
  }

  /**
   * - initialize Form objects .
   */
  private initialize() {
    this._formObject = this.openApps();
    this._formResponses = this._formObject.getResponses();
  }

  /**
   * - Create Form object(FormApp) by setting form URL .
   * @returns FormObject
   */
  public openApps(): Forms {
    const FormObject: Forms = FormApp.openByUrl(this.url);
    return FormObject;
  }

  /**
   * - Get any properties(ex. student number) from Form .
   * @param {StudentShelf} studentData key->studentnumber: string, value-> true or false: boolean
   * @returns {string} numberList student number list .
   */
  public getTitle(): string[] {
    const checker: Check = new Check();
    let numberList: string[] = [];
    for (let items in this._formResponses) {
      let itemResponse: FormItemResponse[] = this._formResponses[items].getItemResponses();

      for (let numbers in itemResponse) {
        let studentNumberList: FormItemResponse = itemResponse[numbers];
        let formColumnTitle: string = studentNumberList.getItem().getTitle();

        if (formColumnTitle.match('学生証番号') || formColumnTitle.match('学籍番号')) {
          // if (formColumnTitle.match('/*番号/')) {
          let studentNumbers = String(studentNumberList.getResponse());
          let correctNumber = checker.isCorrectNumber(studentNumbers);

          if (correctNumber.bool) numberList.push(correctNumber.studentNumberArray);
          continue;
        }
      }
    }
    return numberList;
  }
}
