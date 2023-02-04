import DeckModel from "../models/Deck";
import { Request, Response } from 'express';


export async function deleteDeckController(req: Request, res: Response){
    // Get the deck id from the url
    const deckId = req.params.deckId;
    // Delete the deck from the db
    const deck = await DeckModel.findByIdAndDelete(deckId);
    // Return the deleted deck to the user
    res.json(deck);
}