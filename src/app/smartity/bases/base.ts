export abstract class Base {
  private isOpenList: boolean = true;
  private isOpenActions: boolean = false;
  public id: any;

  constructor() {}

  public openList() {
    this.isOpenActions = false;
    this.isOpenList = true;
  }

  public openActions() {
    this.isOpenList = false;
    this.isOpenActions = true;
  }
}
