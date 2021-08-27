import { Request, Response } from "express";
import { ConcertBusiness } from "../business/ConcertBusiness";
import { Concert, ConcertInputDTO, ENUM_DAY } from "../model/Concert";

 const concertBusiness = new ConcertBusiness()

export class ConcertController {

    async addConcert(req: Request, res: Response){
        try{
            const input: ConcertInputDTO = {
                week_day: req.body.week_day,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                band_id: req.body.band_id
            }
            
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

            // if(input.week_day !== ENUM_DAY.SEXTA && ENUM_DAY.SABADO && ENUM_DAY.DOMINGO){
            //     throw new Error("Dia deve ser sexta, sábado ou domingo")
            // }

      
           await concertBusiness.add(input, token)

            res.send(200).send("Show adicionado com sucesso")



        }catch(error){
            res.status(400).send({ error: error.message });   
        }
    }

    async getConcertByDay(req: Request, res: Response){
        try{
            const day = req.params.day

            if(!day){
                throw new Error("Adicione o dia")
            }

            const token = req.headers.authorization as string;

            if(!token){
                throw new Error("Insira o token de acesso")
            }
            const result = await concertBusiness.getConcertByDay(day, token)

            res.status(200).send(result)

        }catch(error){
            res.status(400).send({ error: error.message });   
        }
    }
}