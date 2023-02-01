// to get the mongoose intellisense we installe in the terminal npm i --save-dev @types/mongoose
import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({
    title: String,
});

const DeckModel = mongoose.model("Deck", DeckSchema);

export default DeckModel;