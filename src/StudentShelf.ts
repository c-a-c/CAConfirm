import { Student } from './Student';

export class StudentShelf {
  // student data: Instance
  private studentList: Array<Student>;
  // index size
  private indexSize: number = 0;

  constructor(maxIndex: number) {
    this.studentList = new Array(maxIndex);
  }

  /**
   * appendStudent
   */
  public appendStudent(student: Student) {
    this.studentList[this.indexSize] = student;
    this.indexSize++;
  }

  /**
   *
   */
  public getMaxIndex() {
    return this.indexSize;
  }

  /**
   *
   */
  public getList(index: number) {
    return this.studentList[index];
  }
}
