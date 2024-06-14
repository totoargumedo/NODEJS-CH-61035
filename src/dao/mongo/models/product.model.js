import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productsSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 450 },
  price: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  thumbnails: { type: Array, required: false, default: [] },
  stock: { type: Number, required: true },
  category: {
    type: String,
    required: true,
  },
  status: { type: Boolean, required: false, default: true },
});

mongoosePaginate.paginate.options = {
  limit: 10,
  lean: true,
  pagination: true,
};
productsSchema.plugin(mongoosePaginate);

export const ProductModel = model(productsCollection, productsSchema);
