import { Form } from './Form';

export class Trigger {
  constructor() {}

  /**
   * - Set trigger to launch automatically .
   *  - set new trigger after deleting old trigger .
   */
  public setTrigger(form: Form) {
    this.deleteTrigger();

    try {
      ScriptApp.newTrigger('makeSheet')
        .forForm(form.openApps())
        .onFormSubmit()
        .create();
      Logger.log('successly create trigger .');
    } catch (error) {
      Logger.log('Miss: cannot set trigger');
    }
  }

  /**
   * - Set trigger to launch automatically .
   */
  private deleteTrigger() {
    for (const trigger of ScriptApp.getProjectTriggers()) {
      try {
        ScriptApp.deleteTrigger(trigger);
        Logger.log('successly delete trigger .');
      } catch (error) {
        Logger.log('Miss: cannot delete trigger .');
      }
    }
  }
}
