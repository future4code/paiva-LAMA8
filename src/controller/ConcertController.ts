import { Request, Response } from "express";
import { ConcertBusiness } from "../business/ConcertBusiness";
import { ConcertDatabase } from "../data/ConcertDatabase";
import { Concert, ConcertInputDTO } from "../model/Concert";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


export class ConcertController {

    async addConcert(req: Request, res: Response){
        try{
                const day = req.body.week_day
                const start_time = req.body.start_time
                const end_time = req.body.end_time
                const band_id = req.body.band_id
            
            const week_day = Concert.stringToConcertDay(day)
            const input:ConcertInputDTO = {week_day, start_time, end_time, band_id}
            
            const token = req.headers.authorization as string;

            if(!token){
                throw new Error("Insira o token de acesso")
            }

            if(input.start_time == NaN || input.end_time == NaN ){
                throw new Error("Insira um numero válido para os horarios")
            }

            if(input.start_time < 8 || input.start_time > 23 || input.start_time > input.end_time){
                throw new Error("Horário do show deve ser entre 8h e 23h")
            }
            if(!Number.isInteger(input.start_time) || !Number.isInteger(input.end_time)){
                throw new Error("Horário incorreto")
            }

            if(!input.week_day){
                throw new Error("Preencha o dia da semana")
            }

            const concertBusiness =
            new ConcertBusiness(
               new IdGenerator(),
               new Authenticator(),
               new ConcertDatabase());
             
           await concertBusiness.add(input, token)

            res.status(201).send("Show adicionado com sucesso")

        }catch(error){
            res.status(400).send({ error: error.message });   
        }
    }

    async getConcertByDay(req: Request, res: Response){
        try{
            const week_day = req.params.day

            
            if(!week_day){
                throw new Error("Adicione o dia")
            }
            const day = Concert.stringToConcertDay(week_day)

            const token = req.headers.authorization as string;

            if(!token){
                throw new Error("Insira o token de acesso")
            }

            const concertBusiness = 
            new ConcertBusiness(
               new IdGenerator(),
               new Authenticator(),
               new ConcertDatabase());

            const result = await concertBusiness.getConcertByDay(day, token)

            res.status(200).send(result)

        }catch(error){
            res.status(400).send({ error: error.message });   
        }
    }
}