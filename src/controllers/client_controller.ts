import {Request, Response } from 'express';
import { Client } from '../entities/Client';

export const createClient = async (req:Request,res:Response)=>{
    try{
        const client=Client.create(req.body)
	    await client.save()
	    return res.json(client)
    } catch (err) {
        console.log(err.message);
      }

} 

