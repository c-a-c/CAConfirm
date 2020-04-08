import { Property } from './Property';
import { SetFormAndSheetData } from './SetFormAndSheetData';

// main
declare var global: any;

global.main = (): void => {
  const prop: Property = new Property();
  const setData: SetFormAndSheetData = new SetFormAndSheetData(prop);
  setData.setTrigger();
};
