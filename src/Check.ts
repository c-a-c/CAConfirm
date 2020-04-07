export class Check {
  constructor() {}

  /**
   * - Student number check .
   * - studentNumber can devide '10' .
   * @param {string} studentNumber Student number .
   * @returns {bool} Whether number can devided by '10' or not .
   */
  public isCorrectNumber(studentNumber: string): any {
    let sumNumber: number = 0;
    let charactor: string[] = studentNumber.split('');

    if (charactor.length == 6) {
    } else if (charactor.length == 7 && charactor[0] == '1') {
      charactor.shift(); // Delete '1'
    } else if (charactor.length == 8 && charactor[0] == 'g' && charactor[1] == '1') {
      charactor.shift(); // Delete 'g'
      charactor.shift(); // Delete '1'
    } else {
      return false;
    }

    for (let i = 0; i < charactor.length; i++) {
      sumNumber += Number(charactor[i]);
    }
    // Logger.log(charactor + ' : ' + sumNumber);
    // If it is possible to devide sumNumber by number'10', it is correct student number .
    return sumNumber % 10 == 0 ? true : false;
    // if (sumNumber % 10 == 0) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
}
