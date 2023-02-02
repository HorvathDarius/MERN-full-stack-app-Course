import express, { Request, Response } from "express";
import mongoose from 'mongoose';

import { config } from 'dotenv';
config();

import DeckModel from "./models/Deck";

const PORT = 5000;

const app = express();

// To be able to work with JSON in the express server, in this case to log the req.body
app.use(express.json());

// Making a POST request on the /decks endpoint
app.post("/decks", async (req: Request, res: Response) => {
    // Creating a new DeckModel item/document called newDeck, with the given title
    const newDeck = new DeckModel({
        title: req.body.title
    });
    // Saving it into the db, and returning its status, cause its a promise
    const createdDeck = await newDeck.save();
    // Returning the response which will be the state of the createdDeck document.
    res.json(createdDeck);
});

mongoose
.connect(
    process.env.MONGO_URL!
).then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
})
