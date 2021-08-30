import { ConcertDatabase } from "../data/ConcertDatabase";
import { ConcertInputDTO, ENUM_DAY } from "../model/Concert";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


export class ConcertBusiness{
    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private concertDatabase: ConcertDatabase
      ){   
      }

    async add(input:ConcertInputDTO, token:string){

        const id = this.idGenerator.generate();

        const tokenResult = this.authenticator.getData(token)
        
        if(!tokenResult){
            throw new Error("token inválido")
        }     
        const compareConcert = await this.concertDatabase.checkTime( input.week_day, input.start_time, input.end_time)
        
        if(compareConcert){
            throw new Error("Show já existente neste horário")
        }
        await this.concertDatabase.createConcert(id, input.week_day, input.start_time, input.end_time, input.band_id  );
    }

    async getConcertByDay(day:ENUM_DAY, token:string){
 
     const tokenResult = this.authenticator.getData(token)
        
    if(!tokenResult){
        throw new Error("token inválido")
    }
 
    const result = await this.concertDatabase.getConcertByDayData(day)

    return result
}
}