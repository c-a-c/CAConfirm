import { Property } from './Property';
import { SetFormAndSheetData } from './SetFormAndSheetData';
import { Form } from './Form';

import { StudentShelf } from './StudentShelf';
import { Student } from './Student';

// main
declare var global: any;

global.main = (): void => {
  const indexLength = 40;
  const studentShelf: StudentShelf = new StudentShelf(indexLength);
  studentShelf.appendStudent(new Student('aaa', '1'));
  studentShelf.appendStudent(new Student('sample', '2'));
  for (let item = 0; item < studentShelf.getMaxIndex(); item++) {
    Logger.log(`${studentShelf.getList(item).getName()} ${studentShelf.getList(item).getFlag()}`);
  }

  // const prop: Property = new Property();
  // const setData: SetFormAndSheetData = new SetFormAndSheetData(prop);
  // setData.makeSheet();
  // const formData: Form = new Form(prop.getForm);
  // try {
  //   ScriptApp.newTrigger('initialize')
  //     .forForm(formData.openApps())
  //     .onFormSubmit()
  //     .create();
  //   Logger.log('successly create trigger .');
  // } catch (error) {
  //   Logger.log('Miss: cannot set trigger');
  // }
};
