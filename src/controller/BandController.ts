import { BandInputDTO } from "../model/Band";
import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { BandDatabase } from "../data/BandDatabase";


export class BandController{

    async add(req: Request, res: Response){
        try{
            const input: BandInputDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible
            }

            if (!input){
                throw new Error("Insira os dados da Banda")
            }

            const token = req.headers.authorization as string;

            if(!token){
                throw new Error("Insira o token de acesso")
            }
           
            const bandBusiness =
            new BandBusiness(
               new IdGenerator(),
               new Authenticator(),
               new BandDatabase());

            await bandBusiness.create(input, token)    

            res.status(200).send(`Banda Registrada com sucesso`);

        } catch(error){
            if(error.message === "Duplicate entry 'U2' for key 'name'"){
                res.status(400).send("Esta banda já existe no banco de dados")
            }
            res.status(400).send({ error: error.message });

        }
    }
    async getBandById(req: Request, res: Response){
        try{
        const id = req.params.id
        const token = req.headers.authorization as string;

        if(!id){
            throw new Error("Insira o id da Banda")
        }
        if(!token){
            throw new Error("Insira o token de acesso")
        }

        const bandBusiness =
        new BandBusiness(
           new IdGenerator(),
           new Authenticator(),
           new BandDatabase());

        const Result = await bandBusiness.getBandById(id, token)
        res.status(200).send(Result)
    }catch(error){
        res.status(400).send({error: error.message})
    }
}
}