/**
 * Used by `StudentShelf.ts`
 */

export class Student {
  // name
  private name: string;
  // student name
  private number: string;
  // true: answered, false: not answered .
  private flag: boolean;

  constructor(name: string, number: string) {
    this.name = name;
    this.number = number;
    this.flag = false;
  }

  /**
   * Get name .
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Get number .
   */
  public getNumber(): string {
    return this.number;
  }

  /**
   * Get number .
   */
  public getFlag(): boolean {
    return this.flag;
  }

  /**
   * Get number .
   */
  public setFlag(): void {
    this.flag = true;
  }
}
