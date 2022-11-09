import {Request, Response } from 'express';
import { Banker } from '../entities/Banker';

export const createBanker = async (req:Request,res:Response)=>{
    try{
        const banker=Banker.create(req.body)
        await banker.save()
	    return res.json(banker)
    } catch (err) {
        console.log(err.message);
      }

} 