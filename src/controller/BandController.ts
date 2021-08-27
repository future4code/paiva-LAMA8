import { BandInputDTO } from "../model/Band";
import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";

const bandBusiness = new  BandBusiness()

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
           
            await bandBusiness.create(input, token)
            
         

            res.status(200).send(`Banda Registrada com sucesso`);

        } catch(error){
            res.status(400).send({ error: error.message });

        }
    }
    async getBandById(req: Request, res: Response){
        const id = req.params.id

        if(!id){
            throw new Error("Insira o id da Banda")
        }

        const Result = await bandBusiness.getBandById(id)
        
    }
}