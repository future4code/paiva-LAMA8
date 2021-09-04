import { BandDatabase } from "../data/BandDatabase";
import { BandInputDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


export class BandBusiness{
    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private bandDatabase: BandDatabase
      ){   
      }

    async create(input:BandInputDTO, token:string){
       
        const tokenResult = this.authenticator.getData(token)
        
        if(!tokenResult){
            throw new Error("token inválido")
        }
        if(tokenResult.role === "NORMAL"){
            throw new Error("Somente administradores podem registrar bandas")
        }
 
        const id = this.idGenerator.generate();

        await this.bandDatabase.createBand(id,input.name, input.music_genre, input.responsible);
    }
 
    async getBandById(id:string, token:string){

        const tokenResult = this.authenticator.getData(token)
        if(!tokenResult){
            throw new Error("token inválido")
        }
        
        const Result = this.bandDatabase.getBandByIdData(id)
        return Result
    }

}
    