import DeckModel from "../models/Deck";
import { Request, Response } from 'express';

export async function createDeckController(req: Request, res: Response){
    // Creating a new DeckModel item/document called newDeck, with the given title
    const newDeck = new DeckModel({
        title: req.body.title
    });
    // Saving it into the db, and returning its status, cause its a promise
    const createdDeck = await newDeck.save();
    // Returning the response which will be the state of the createdDeck document.
    res.json(createdDeck);
}