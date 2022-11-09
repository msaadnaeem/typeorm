import {Request, Response } from 'express';
import { Transaction,TransactionTypes } from '../entities/Transaction';
import { Client } from '../entities/Client';
import { AppDataSource } from '../Datasource';
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