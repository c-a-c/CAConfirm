export class Check {
  constructor() {}

  /**
   * - Student number check .
   * - studentNumber can devide '10' .
   * @param studentNumber Student number .
   * @returns sumNumber Whether number can devided by '10' or not .
   */
  public numberCheck(studentNumber: string): boolean {
    let sumNumber: number = 0;
    let charactor: string[] = studentNumber.split('');

    for (let i = 0; i < charactor.length; i++) {
      sumNumber += Number(charactor[i]);
    }
    // If it is possible to devide sumNumber by number'10', it is correct student number .
    return sumNumber % 10 == 0 ? true : false;
  }
}
