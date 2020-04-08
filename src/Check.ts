export class Check {
  constructor() {}

  /**
   * - Student number check .
   * - studentNumber can devide '10' .
   * @param {string} studentNumber Student number .
   * @returns {bool, string} (Whether number can devided by '10' or not) (student number except 'g' or '1') .
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
      return { bool: false, studentNumberArray: charactor.join('') };
    }

    for (let i = 0; i < charactor.length; i++) {
      sumNumber += Number(charactor[i]);
    }
    // Logger.log(charactor + ' : ' + sumNumber);
    // If it is possible to devide sumNumber by number'10', it is correct student number .
    // return sumNumber % 10 == 0 ? {bool: true, studentNumberArray: charactor.join('')} : {bool: false, studentNumberArray: charactor.join('')};
    if (sumNumber % 10 == 0) {
      return { bool: true, studentNumberArray: charactor.join('') };
    } else {
      return { bool: false, studentNumberArray: charactor.join('') };
    }
  }
}
