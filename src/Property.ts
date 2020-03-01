import Prop = GoogleAppsScript.Properties.Properties;

export class Property {
  private _properteis: Prop = PropertiesService.getScriptProperties();
  private _form: string;
  // private _sheet: string;
  private _sheetForEveryone: string;
  private _sheetMenbers: string;
  private _eventTitle: string;

  public constructor() {
    this._form = this._properteis.getProperty('GF_URL');
    // this._sheet = this._properteis.getProperty('SS_URL');
    this._sheetForEveryone = this._properteis.getProperty('SS_FOR_EVERYONE_URL');
    this._sheetMenbers = this._properteis.getProperty('SS_MENBERS_URL');
    this._eventTitle = this._properteis.getProperty('EVENT_TITLE');
    this.alert();
  }

  /**
   * - Get Form URL from 'GF_URL' property .
   * @returns this._form : Google form URL
   */
  public get getForm(): string {
    return this._form;
  }

  /**
   * - Get SpreadSheet URL from 'SS_FOR_EVERYONE_URL' property .
   * @returns this._sheetForEveryone : SpreadSheet for everyone form URL
   */
  public get getSheetForEveryone(): string {
    return this._sheetForEveryone;
  }

  /**
   * - Get SpreadSheet URL from 'SS_MENBERS_URL' property .
   * @returns this._sheetMenbers : SpreadSheet(register of names) form URL
   */
  public get getSheetMenbers(): string {
    return this._sheetMenbers;
  }

  /**
   * - Get event name from 'EVENT_TITLE' property .
   * @returns this._eventTitle : event name
   */
  public get getEventName(): string {
    return this._eventTitle;
  }

  /**
   * - Notice that is not set URLs or event name .
   */
  private alert() {
    if (!this._form) {
      throw 'You should set "GF_URL" property from [File] > [Project properties] > [Script properties]';
    }
    if (!this._sheetForEveryone) {
      throw 'You should set "SS_FOR_EVERYONE_URL" property from [File] > [Project properties] > [Script properties]';
    }
    if (!this._sheetMenbers) {
      throw 'You should set "SS_MENBERS_URL" property from [File] > [Project properties] > [Script properties]';
    }
    if (!this._eventTitle) {
      throw 'You should set "EVENT_TITLE" property from [File] > [Project properties] > [Script properties]';
    }
  }
}
