import express, { Request, Response } from "express";
import mongoose from 'mongoose';

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
    'mongodb+srv://flashcardsage:FkRd6LefoBoU4yr3@cluster0.l4tebpm.mongodb.net/?retryWrites=true&w=majority'
).then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
})
