export class Check {
  constructor() {}

  /**
   * - Student number check .
   * - studentNumber can devide '10' .
   * @param studentNumber Student number .
   * @returns sumNumber Whether number can devided by '10' or not .
   */
  public numberCheck(studentNumber: string) {
    let sumNumber: number = 0;
    let charactor: string[] = studentNumber.split('');

    if (charactor.length == 6) {
    } else if (charactor.length == 7 && charactor[0] == '1') {
      charactor.shift();
    } else if (charactor.length == 8 && charactor[0] == 'g') {
      charactor.shift();
      charactor.shift();
    } else {
      return { bool: false, numberList: charactor };
    }

    for (let i = 0; i < charactor.length; i++) {
      sumNumber += Number(charactor[i]);
    }
    // Logger.log(charactor + ' : ' + sumNumber);
    // If it is possible to devide sumNumber by number'10', it is correct student number .
    // return sumNumber % 10 == 0 ? true : false;
    if (sumNumber % 10 == 0) {
      return { bool: true, numberList: charactor };
    } else {
      return { bool: false, numberList: charactor };
    }
  }
}
