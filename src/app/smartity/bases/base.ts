export abstract class Base {
  private isOpenList: boolean = true;
  private isOpenActions: boolean = false;
  public id: any;
  public strAction: string = '';

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
