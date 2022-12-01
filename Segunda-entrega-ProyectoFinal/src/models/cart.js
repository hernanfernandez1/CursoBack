import mongoose from "mongoose";
import { productsCollectionName } from "./products.js";

export const cartCollectionName = "carritos";

export const cartsSchema = new mongoose.Schema({
  timestamp: { type: String, required: true },
  productsID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: productsCollectionName,
      default: [],
    },
  ],
});

export const CartsModel = mongoose.model(cartCollectionName, cartsSchema);
