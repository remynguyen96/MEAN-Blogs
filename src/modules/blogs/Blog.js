import mongoose, {Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const BlogSchema = new Schema({
  title: {
    type: String,
    trim: true,
    minLength: [5, 'Title post need to be longer !'],
    required: [true,'Title post is required !'],
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    minLength: [5, 'Slug post need to be longer !'],
    required: [true,'Slug post is required !'],
  },
  description: {
    type: String,
    trim: true,
    minLength: [5, 'Description post need to be longer !'],
    required: [true,'Description post is required !'],
  },
  images: {
    type: String,
    trim: true,
  },
  categories:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      // required: [true, 'Category is required !'],
    }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: [true, 'Author is required !'],
  },
  favoriteCount: {
    type: Number,
    default: 0,
  }
},{timestamps: true});

BlogSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken !'
});

// BlogSchema.pre('validate', function (next){
//   next();
// });

BlogSchema.methods = {
  toJSON() {
    return {
      _id : this._id,
      title : this.title,
      slug : this.slug,
      description : this.description,
      images : this.images,
      categories : this.categories,
      author : this.author,
      favoriteCount : this.favoriteCount,
      createdAt: this.createdAt,
    }
  },
};

BlogSchema.static = {
  createBlog(args, author) {
    return this.create({
      ...args,
      author,
    });
  },
  listBlogs({skip = 0, limit= 10} = {}) {
    return this.find()
               .sort({createdAt: -1})
               .skip(skip)
               .limit(limit)
               .populate('author');
  },
  incFavoriteCount(blogId) {
    return this.findByIdAndUpdate(blogId, { total: {favoriteCount: 1} });
  },
  decFavoriteCount(blogId) {
    return this.findByIdAndUpdate(blogId, { total: {favoriteCount: -1} });
  }
}

export default mongoose.model('Blog',BlogSchema);
