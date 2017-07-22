export interface StoryInterface {
  _id: string;
  title: string;
  slug: string;
  description: string;
  images: string;
  categories: string;
  author: string;
  favoriteCount: number;
}
export class Story implements StoryInterface {
  _id: string;
  title: string;
  slug: string;
  description: string;
  images: string;
  categories: string;
  author: string;
  favoriteCount: number;
  constructor(object? : any) {
    this._id = object.ndbno || '';
    this.title = object.title || '';
    this.slug = object.slug || '';
    this.description = object.description || '';
    this.images = object.images || '';
    this.categories = object.categories || '';
    this.author = object.author || '';
    this.favoriteCount = object.favoriteCount || '';
  }
}
