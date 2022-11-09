import {Request, Response } from 'express';
import { Client } from '../entities/Client';
import { Banker } from '../entities/Banker';
import { AppDataSource } from '../Datasource';
export const connect = async (req:Request,res:Response)=>{
    try{
        const banker_id=parseInt(req.params.bankerId)
        const client_id=parseInt(req.params.clientId)
		// const client = await Client.findOneBy({id:client_id})
        const client= await AppDataSource.getRepository(Client).findOneBy({id:client_id})
		// const banker = await Banker.findOneBy({id:banker_id})
        const banker= await AppDataSource.getRepository(Banker).findOneBy({id:banker_id})
        if (banker && client) {
			console.log(banker.clients)
			banker.first_name='mahnoor'
			banker.clients = [...banker.clients,client]
			await banker.save();
			console.log(banker.clients)
			

			return res.json({
				msg: 'banker connected to client',
			});
		} else {
			return res.json({
				msg: 'banker or client not found',
			});
		}
    } catch (err) {
		console.log(err.message)
      }
} 

