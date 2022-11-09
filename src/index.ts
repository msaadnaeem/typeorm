import { AppDataSource } from "./Datasource"
import client from "./routes/client_routes"
import banker from "./routes/banker_routes"
import express, { Express, Request, Response } from 'express';
const app: Express = express();
app.use(express.json())

app.use('/api/client/',client)
app.use('/api/banker/',banker)
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });


app.listen(5000, () => {
    console.log(`server is running at https://localhost:5000`);
});


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
