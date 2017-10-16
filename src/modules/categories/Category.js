import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const CategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    minLength: [5, "Name category need to be longer !"],
    required: [true, "Name category is required !"]
  },
  description: {
    type: String,
    trim: true,
    minLength: [5, "Description category need to be longer !"]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

CategorySchema.plugin(uniqueValidator, {
  message: `{VALUE} already taken !`
});

CategorySchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt
    };
  }
};

CategorySchema.statics = {
  listCategories({ skip = 0, limit = 5 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }
};

export default mongoose.model("Category", CategorySchema);
