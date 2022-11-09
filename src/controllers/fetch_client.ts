import {Request, Response } from 'express';
import { Client } from '../entities/Client';
import { AppDataSource } from '../Datasource';
export const fetchClient = async (req:Request,res:Response)=>{
    try{
        const id = parseInt(req.params.clientId)        
        const client= await AppDataSource.getRepository(Client).findOneBy({id})
        console.log(client)
        if(!client){
            return res.json({
                msg:"client doesn't exist"
            })
        }
        const fetchedClient = await AppDataSource.getRepository(Client).createQueryBuilder(
            'client'
        )
            .leftJoinAndSelect(
                'client.transactions',
                'transaction'
            )
            .where('client.id = :id', {
                id,
            })
            .getOne();
            return res.json(fetchedClient);
    } catch (err) {
        console.log(err.message);
      }

} 

