"use strict";

import mongoose from "mongoose";
import ingredientSchema from "./schema";

const ingredientMongooseSchema = new mongoose.Schema(ingredientSchema);

export default mongoose.model("Ingredient", ingredientMongooseSchema);
