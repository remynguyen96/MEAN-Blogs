export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  ipAddress: string;
  favorites: any;
}

export class User implements UserInterface {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  ipAddress: string;
  favorites: any;
  constructor(object? : any) {
    this._id = object.ndbno || '';
    this.name = object.name || '';
    this.email = object.email || '';
    this.ipAddress = object.ipAddress || '';
    this.avatar = object.avatar || '';
    this.favorites = object.favorites || '';
  }
}
