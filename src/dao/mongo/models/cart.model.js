import { model, Schema } from "mongoose";

const cartCollection = "cart";

const cartSchema = new Schema({
  products: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
      _id: false,
    },
  ],
});

export const CartModel = model(cartCollection, cartSchema);
