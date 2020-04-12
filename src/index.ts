import { SetFormAndSheetData } from './SetFormAndSheetData';

// main
declare var global: any;

global.main = (): void => {
  const setData: SetFormAndSheetData = new SetFormAndSheetData();
  setData.run();
};
