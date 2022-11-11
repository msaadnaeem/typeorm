import dotenv from "dotenv"
dotenv.config()

import {DataSource} from "typeorm"
import { Client } from "./entities/Client"
import { Banker } from "./entities/Banker"
import { Transaction } from "./entities/Transaction"
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "saadnaeem",
    password: undefined,
    database: "typeorm",
    entities:[Client,Banker,Transaction],
    synchronize:true
})

