import {Request, Response } from 'express';
import { Client } from '../entities/Client';
import { AppDataSource } from '../Datasource';

export const deleteClient = async (req:Request,res:Response)=>{
    try{
        const id = parseInt(req.params.clientId)        
        const client= await AppDataSource.getRepository(Client).findOneBy({id})
        if(!client){
            return res.json({
                msg:"client doesn't exist"
            })
        }
        await AppDataSource.getRepository(Client).delete({id})
        return res.json({
            msg:"client deleted successfully"
        })
    } catch (err) {
        console.log(err.message);
      }

} 

