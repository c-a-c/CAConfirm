/**
 * This class is not used
 * 'cause it is not avalable to use when it is transpiled JS(GAS) from TS .
 */

import FormsApp = GoogleAppsScript.Forms.FormApp;
import Forms = GoogleAppsScript.Forms.Form;
import SheetsApp = GoogleAppsScript.Spreadsheet.SpreadsheetApp;
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;

abstract class AbstractOpen {
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  /**
   * openApps
   */
  public abstract openApps(): Forms | void /* Spreadsheet */;
}
