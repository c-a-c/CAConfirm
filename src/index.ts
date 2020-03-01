import { Property } from './Property';
import { SetFormAndSheetData } from './SetFormAndSheetData';
import { Form } from './Form';

// main
declare var global: any;

global.main = (): void => {
  const prop: Property = new Property();
  const setData: SetFormAndSheetData = new SetFormAndSheetData(prop);
  setData.makeSheet();
  const formData: Form = new Form(prop.getForm);
  try {
    ScriptApp.newTrigger('initialize')
      .forForm(formData.openApps())
      .onFormSubmit()
      .create();
    Logger.log('successly create trigger .');
  } catch (error) {
    Logger.log('Miss: cannot set trigger');
  }
};
