import {Request, Response } from 'express';
import { Client } from '../entities/Client';
import { AppDataSource } from '../Datasource';
import { Transaction,TransactionTypes } from '../entities/Transaction';

export const createClient = async (req:Request,res:Response)=>{
    try{
        const client=Client.create(req.body)
	    await client.save()
	    return res.json(client)
    } catch (err) {
        console.log(err.message);
      }

} 

export const createTransaction = async (req:Request,res:Response)=>{
    try{
       const id = parseInt(req.params.id);
       const {type,amount}=req.body
       const client= await AppDataSource.getRepository(Client).findOneBy({id})
       if(!client){
        return res.json({msg:"client not found"})
       }
       const transaction = Transaction.create({
        amount,
        type,
        client
       })
       await transaction.save()
       if(type===TransactionTypes.DEPOSIT){
        client.balance=client.balance+amount
       }
       else if(type===TransactionTypes.WITHDRAW){
        client.balance=client.balance-amount
       }
       await client.save()
       return res.json({msg:"transaction succesful"})
    } catch (err) {
        console.log(err.message);
      }

} 

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
