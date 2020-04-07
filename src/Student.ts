/**
 * Used by `StudentShelf.ts`
 */

export class Student {
  // name
  private _name: string;
  // student name
  private _number: string;
  // true: answered, false: not answered .
  private _flag: boolean;

  constructor(name: string, number: string) {
    this._name = name;
    this._number = number;
    this._flag = false;
  }

  /**
   * Get name .
   */
  public getName(): string {
    return this._name;
  }

  /**
   * Get number .
   */
  public getNumber(): string {
    return this._number;
  }

  /**
   * Get number .
   */
  public getFlag(): boolean {
    return this._flag;
  }

  /**
   * Get number .
   */
  public setFlag(): void {
    this._flag = true;
  }
}
