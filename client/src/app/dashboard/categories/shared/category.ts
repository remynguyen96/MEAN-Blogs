export interface Interface {
  _id: string;
  name: string;
  description: string;
}

export class Category implements Interface {
  _id: string;
  name: string;
  description: string;
  constructor(obj? : any) {
    this._id = obj.ndbno || '';
    this.name = obj.name || '';
    this.description = obj.description || '';
  }
}
