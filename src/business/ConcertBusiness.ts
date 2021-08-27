import { ConcertDatabase } from "../data/ConcertDatabase";
import { BandInputDTO } from "../model/Band";
import { Concert, ConcertInputDTO } from "../model/Concert";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

const authenticator = new Authenticator();
const concertDatabase = new ConcertDatabase();

export class ConcertBusiness{

    async add(input:ConcertInputDTO, token:string){

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const tokenResult = authenticator.getData(token)
        
        if(!tokenResult){
            throw new Error("token inválido")
        }
     

        await concertDatabase.createConcert(id, input.week_day, input.start_time, input.end_time, input.band_id  );
    }

    async getConcertByDay(day:string, token:string){
 
     const tokenResult = authenticator.getData(token)
        
    if(!tokenResult){
        throw new Error("token inválido")
    }
 
    const result = await concertDatabase.getConcertByDayData(day)

    return result
}
}